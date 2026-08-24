export interface LastPurchaseDto{
    id:string;
    userId:string
    userEmail:string;
    courseTitle:string;
    courseSlug:string;
    courseImageUrl:string;
    price:number;
    createdAt:Date;
}