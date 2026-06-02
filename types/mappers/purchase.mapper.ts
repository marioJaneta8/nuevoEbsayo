
import { Purchase,Course, Chapter } from "@prisma/client";
import { PurchaseDTO } from "../purchaseDto";
import { CourseDTO } from "../course";
import { toCourseDTO } from "./course.mapper";
import { ChapterDTO } from "../chapterDto";
import { toChaptersDTO } from "./chapter.mapper";



export function toPurchaseDTO(purchase:Purchase): PurchaseDTO {
    return{
        id: purchase.id,
        userId: purchase.userId,
        courseId: purchase.courseId,
        price: purchase.price, 
        createdAt: purchase.createdAt,
        updatedAt: purchase.updatedAt,
     
    }
}

export function toPurchasesDTO(purchases: Purchase[]): PurchaseDTO[] {
    return purchases.map(toPurchaseDTO);
}



export  interface CourseWithPurchaseDTO extends CourseDTO {
    purchases: PurchaseDTO[];
}


//api

export function toCourseWithPurchaseDTO(course: Course & { purchases: Purchase[] }): CourseWithPurchaseDTO {
    return {
        ...toCourseDTO(course),
        purchases: toPurchasesDTO(course.purchases || []),
        
    }
}   

// detalled purchase with course info

export interface CourseDetailsDTO extends CourseDTO {
    purchases: PurchaseDTO[];
    chapters: ChapterDTO[];
}
// Mapper para convertir un Course con sus Purchases y Chapters a CourseDetailsDTO, que se usará en el backend para mapear los datos que vienen de la base de datos y enviarlos al frontend en el formato correcto. Este DTO se construirá a partir del Course, sus Purchases asociados y sus Chapters asociados, utilizando los mappers definidos anteriormente para convertir cada Purchase a PurchaseDTO, cada Chapter a ChapterDTO y el Course a CourseDTO.
export function toCourseDetailsDTO(course: Course & { purchases: Purchase[]; chapters: Chapter[] }): CourseDetailsDTO {
    return {
        ...toCourseDTO(course),
        purchases: toPurchasesDTO(course.purchases || []),
        chapters: toChaptersDTO(course.chapters || []),
    }
}

// Mapper para convertir el progreso del usuario en un curso a un DTO que se usará en el frontend para mostrar el progreso del usuario en un curso específico. Este DTO se construirá a partir del porcentaje de progreso calculado a partir de los capítulos completados por el usuario y el total de capítulos del curso.

