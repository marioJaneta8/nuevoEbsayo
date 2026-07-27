
export interface OrderDTO {
  id: string;
  userId: string;
  courseId: string;
  title: string;
  price: number;
  createdAt: Date;
}

export interface ReceiptDTO {
  paymentIntentId: string;
  receiptUrl: string | null;
}

export interface OrdersPageProps {
  purchases: OrderDTO[];
  receipts: ReceiptDTO[];
}

