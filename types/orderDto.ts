// types/orderDto.ts

import { PaymentStatus } from "@prisma/client";

export interface OrderDTO {
id: string;
userId: string;
courseId: string;
paymentId: string | null;
title: string;
price: number;
paymentStatus: PaymentStatus | null;
createdAt: Date;
}

export interface ReceiptDTO {
paymentIntentId: string;
receiptUrl: string | null;
}

export interface OrdersPageProps {
purchases: OrderDTO[];

}


export interface ReceiptResponse {
  success: boolean;
  receiptUrl: string | null;
  error?: string;
}
