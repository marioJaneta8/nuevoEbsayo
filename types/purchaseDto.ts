


export interface Purchase{
    id: string;
    userId: string;
    courseId: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}


export interface PurchaseDTO{
    id: string;
    userId: string;
    courseId: string;
    price: number;
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
