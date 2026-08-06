import { prisma } from "@/lib/prisma";
import { ChapterDTO } from "@/types/chapterDto";
import { toChaptersDTO } from "@/types/mappers/chapter.mapper";

export async function getChapterByCourse(courseId:string):Promise<ChapterDTO[]>{
    try{

    const chapter= await prisma.chapter.findMany({
        where:{
            courseId,
            isPublished: true,
        },
        orderBy:{
            position:"asc",
        },
    })
    return toChaptersDTO(chapter);
    }catch(error){
    console.error("Error al obtener los capitulos del curso:", error);
    return [];

    }
}