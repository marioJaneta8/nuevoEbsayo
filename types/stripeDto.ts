
export interface StripeCustomer {
  id: string;
  userId: string;
  stripeCustomerId: string;
  createdAt: Date;
  updatedAt: Date;
}

//Dto para el frontend
export interface StripeCustomerDTO {
  id: string;
  userId: string;
  stripeCustomerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StripeCustomerResponse {
  success: boolean;
  data: StripeCustomerDTO | null;
  error?: string;
}