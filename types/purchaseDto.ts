


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