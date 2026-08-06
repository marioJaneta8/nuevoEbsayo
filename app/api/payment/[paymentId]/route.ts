import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-05-27.dahlia",
});

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ paymentId: string }>;
  },
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const { paymentId } = await params;

    // Buscamos el Payment de nuestro usuario
    const payment = await prisma.payment.findFirst({
      where: {
        id: paymentId,
        userId,
      },
    });

    if (!payment) {
      return NextResponse.json(
        {
          success: false,
          error: "Payment not found",
        },
        { status: 404 },
      );
    }

    // En tu BD tienes un PaymentIntent ID: pi_...
    if (!payment.stripePaymentId) {
      return NextResponse.json(
        {
          success: false,
          error: "Stripe PaymentIntent not found",
        },
        { status: 404 },
      );
    }

    // Recuperamos el PaymentIntent desde Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(
      payment.stripePaymentId,
    );

    // Verificamos que exista un Charge
    if (!paymentIntent.latest_charge) {
      return NextResponse.json(
        {
          success: false,
          error: "Charge not found",
        },
        { status: 404 },
      );
    }

    // Obtenemos el ID del Charge: ch_...
    const chargeId =
      typeof paymentIntent.latest_charge === "string"
        ? paymentIntent.latest_charge
        : paymentIntent.latest_charge.id;

    // Recuperamos el Charge
    const charge = await stripe.charges.retrieve(chargeId);

    return NextResponse.json({
      success: true,
      receiptUrl: charge.receipt_url ?? null,
    });
  } catch (error) {
    console.error("[GET_RECEIPT]", error);

    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}