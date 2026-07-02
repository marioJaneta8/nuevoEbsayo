


export interface Purchase{
    id: string;
    userId: string;
    courseId: string;
    price: number;
    paymentId: string | null;
    createdAt: Date;
    updatedAt: Date;
}


export interface PurchaseDTO{
    id: string;
    userId: string;
    courseId: string;
    price: number;
    paymentId:string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface PurchaseResponse{
    success: boolean;
    data: PurchaseDTO | null;
    error?: string;
}


//boolean purchased
export interface PurchaseStatusDTO {
  purchased: boolean;
}


//Purchase Status Response  para obtener el estado de compra
export  interface PurchaseStatusResponse{
    success: boolean;
    data: PurchaseStatusDTO | null;
    error?: string | null;
}



//enums de estado para la session de stripe

export enum PaymentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELED = "CANCELED",
  UNPAID = "UNPAID"
}

export interface EnrollmentPaymentDTO{
    purchase: boolean;
    payment: PaymentStatus | null;  //usa el enum
    
}

export interface EnrollmentPaymentResponse{
    success: boolean;
    data: EnrollmentPaymentDTO | null;
    error?: string | null;
}