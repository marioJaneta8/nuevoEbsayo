import { Course, Purchase } from "@prisma/client";
import { CertificateDTO } from "../certificateDto";


type PurchaseWithCourse= Purchase & {
    course:Course
}

export function toCertificateDto(purchase:PurchaseWithCourse):CertificateDTO{

    return {
        id:purchase.id,
        courseId:purchase.courseId,
        userId:purchase.userId,
        courseTitle:purchase.course.title,
        courseImageUrl:purchase.course.imageUrl || '',
        courseDescription:purchase.course.description || '',
        purchaseDate:purchase.createdAt
    }
    
}


export function toCertificatesDto(purchases:PurchaseWithCourse[]):CertificateDTO[]{
    return purchases.map(toCertificateDto)
}

