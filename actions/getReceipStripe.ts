import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-05-27.dahlia",
});

export const getReceiptByPaymentId = async (
  stripePaymentId: string,
): Promise<string | null> => {
  try {
    const charge = await stripe.charges.retrieve(stripePaymentId);

    return charge.receipt_url ?? null;
  } catch (error) {
    console.error("[GET_RECEIPT_BY_PAYMENT_ID]", error);
    return null;
  }
};