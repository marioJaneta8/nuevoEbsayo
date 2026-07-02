


import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const headerList = await headers();
  const signature = headerList.get("Stripe-Signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Firma de stripe inválida" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  // 1. Limitar el try-catch de construcción del evento
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: unknown) {
    console.error("[WEBHOOK_CONSTRUCTION_ERROR]", error instanceof Error ? error.message : String(error));
    return NextResponse.json(
      { error: "Error al construir el evento de stripe" },
      { status: 400 }
    );
  }

  // 2. Manejo de cada evento de forma independiente
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session?.metadata?.userId;
        const courseId = session?.metadata?.courseId;

        if (!userId || !courseId) {
          return NextResponse.json(
            { error: "Metadata incompleto para completar la compra" },
            { status: 400 }
          );
        }

        // Verificar si ya existe la compra
        const existingPurchase = await prisma.purchase.findUnique({
          where: {
            userId_courseId: { userId, courseId },
          },
        });

        if (existingPurchase) {
          // Retornar 200 OK para indicarle a Stripe que ya está procesado y no reintente
          return NextResponse.json(
            { message: "El curso ya había sido comprado previamente" },
            { status: 200 }
          );
        }

        // Ejecutar transacción atómica
        await prisma.$transaction(async (tx) => {
          const payment = await tx.payment.update({
            where: { stripeSessionId: session.id },
            data: {
              status: "COMPLETED",
              stripePaymentId: session.payment_intent as string,
            },
          });

          await tx.purchase.upsert({
            where: {
              userId_courseId: {
                userId: payment.userId,
                courseId: payment.courseId,
              },
            },
            update: {},
            create: {
              userId: payment.userId,
              courseId: payment.courseId,
              price: Number(payment.amount),
              paymentId: payment.id,
            },
          });
        });

        return NextResponse.json(
          {
            data:null,
            error:null
          
          },
          { status: 200 }
        );
      }

      case "checkout.session.expired": {
        const session = event.data.object as Stripe.Checkout.Session;
        
        await prisma.payment.update({
          where: { stripeSessionId: session.id },
          data: { status: "CANCELED" },
        });

        return NextResponse.json(
          { message: "Sesión de checkout expirada correctamente" },
          { status: 200 }
        );
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        
        // Buscar la Checkout Session relacionada para obtener el id correspondiente a stripeSessionId
        const sessions = await stripe.checkout.sessions.list({
          payment_intent: paymentIntent.id,
          limit: 1,
        });
        
        const checkoutSession = sessions.data[0];

        if (checkoutSession) {
          await prisma.payment.update({
            where: { stripeSessionId: checkoutSession.id },
            data: { status: "FAILED" },
          });
        } else {
          console.warn(`[WEBHOOK_WARN] No se encontró checkout session para payment intent: ${paymentIntent.id}`);
        }

        return NextResponse.json(
          { message: "Estado de pago actualizado a fallido" },
          { status: 200 }
        );
      }

      case "checkout.session.async_payment_failed": {
        const session = event.data.object as Stripe.Checkout.Session;
        
        await prisma.payment.update({
          where: { stripeSessionId: session.id },
          data: { status: "UNPAID" },
        });

        return NextResponse.json(
          { message: "Pago asíncrono marcado como no pagado (UNPAID)" },
          { status: 200 }
        );
      }

      default:
        // Retornar 200 OK para eventos no manejados y evitar que Next.js retorne undefined
        return NextResponse.json(
          { message: `Evento no manejado: ${event.type}` },
          { status: 200 }
        );
    }
  } catch (dbError: unknown) {
    console.error("[WEBHOOK_DATABASE_ERROR]", dbError);
    // Retornamos 500 para fallos transitorios de base de datos, Stripe reintentará más tarde
    return NextResponse.json(
      { error: "Error en el servidor al procesar datos del webhook" },
      { status: 500 }
    );
  }
}

