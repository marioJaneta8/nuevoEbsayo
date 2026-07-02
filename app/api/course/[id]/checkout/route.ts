import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    const { id } = await params;
    const user = await currentUser();

    // 1. Buscar el curso y validar capítulos
    const course = await prisma.course.findUnique({
      where: {
        id: id,
        isPublished: true,
      },
      include: {
        chapters: {
          orderBy: {
            position: "asc",
          },
        },
      },
    });

    if (!course) {
      return new NextResponse("curso no encontrado", { status: 404 });
    }

    const firstChapter = course.chapters[0];
    if (!firstChapter) {
      return new NextResponse("El curso no tiene capítulos disponibles", { status: 400 });
    }

    // 2. Verificar si el usuario ya compró el curso
    const purchase = await prisma.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: id,
        },
      },
    });

    if (purchase) {
      return new NextResponse("curso ya comprado", { status: 400 });
    }

    const price = Number(course.price ?? 0);
    if (isNaN(price)) {
      return new NextResponse("precio inválido", { status: 400 });
    }

    // 3. Preparar los line items para Stripe
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: {
            name: course.title,
          },
          unit_amount: Math.round(price * 100),
        },
      },
    ];

    // 4. Gestión del Cliente de Stripe (Solución al Bug de TypeScript)
    const existingCustomer = await prisma.stripeCustomer.findUnique({
      where: { userId: userId },
    });

    const email = user?.emailAddresses[0]?.emailAddress;
    if (!email) {
      return new NextResponse("email no encontrado", { status: 400 });
    }

    let stripeCustomerId: string;

    if (!existingCustomer) {
      // Creamos el cliente en Stripe
      const customer = await stripe.customers.create({
        email: email,
      });

      // Guardamos en nuestra base de datos
      const newStripeCustomer = await prisma.stripeCustomer.create({
        data: {
          userId: userId,
          stripeCustomerId: customer.id,
        },
      });
      
      stripeCustomerId = newStripeCustomer.stripeCustomerId;
    } else {
      stripeCustomerId = existingCustomer.stripeCustomerId;
    }

    // 5. Limpieza de pagos pendientes previos
    await prisma.payment.deleteMany({
      where: {
        userId,
        courseId: id,
        status: "PENDING",
      },
    });

    // 6. Crear Sesión de Checkout en Stripe
    // Redirige a la raíz del curso para que nuestro componente HeroBlockCourse procese el polling
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      line_items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.slug}?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.slug}?cancelled=1`,
      metadata: {
        courseId: course.id,
        userId: userId,
      },
    });

    // 7. Registrar el intento de pago en estado PENDING
    await prisma.payment.create({
      data: {
        userId: userId,
        courseId: id,
        amount: price,
        status: "PENDING",
        currency: "usd",
        stripeSessionId: session.id,
      },
    });

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.error("[CHECKOUT_API_ERROR]", error);
    return new NextResponse("internal server error", { status: 500 });
  }
}