import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { ProgressDTO } from "@/types/progressDto";
import { toProgressDto } from "@/types/mappers/progress.mapper";
// se encarga de marcar un capítulo como completado
export async function getMarkChapterAsCompleted(chapterId: string):Promise<ProgressDTO | null>{
  try {
    const { userId } = await auth();

    if (!userId) {
    throw new Error("No estas autorizado")
    }
    
    const progress = await prisma.userProgress.upsert({
    where: {
        userId_chapterId: {
        userId,
        chapterId,
        },
    },
    update: {
        isCompleted: true,
    },
    create: {
        userId,
        chapterId,
        isCompleted: true,
    }
})

    return toProgressDto(progress);


   
  } catch (error) {
    console.error("Error checking purchase status:", error);
    return null;
  }
}