
import { StripeCustomer } from "@prisma/client";
import { StripeCustomerDTO } from "../stripeDto";

export function toStripeCustomerDTO(stripe: StripeCustomer): StripeCustomerDTO {
  return {
    id: stripe.id,
    userId: stripe.userId,
    stripeCustomerId: stripe.stripeCustomerId,
    createdAt: stripe.createdAt,
    updatedAt: stripe.updatedAt,
  };
}

//Mapper para listas
export function toStripeCustomersDTO(stripes: StripeCustomer[]): StripeCustomerDTO[] {
  return stripes.map(toStripeCustomerDTO);
}
  