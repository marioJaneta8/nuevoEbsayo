import { prisma } from "@/lib/prisma";
import { ProgressDTO } from "@/types/progressDto";
import { toProgressDtoList } from "@/types/mappers/progress.mapper";
import { auth } from "@clerk/nextjs/server";

export async function getUserProgress(courseId: string): Promise<ProgressDTO[]> {
  try {
    const { userId } = await auth();

    if (!userId) {
      return [];
    }

    // Buscamos SOLO en la tabla de progreso, filtrando por el usuario y el curso actual
    const progressRecords = await prisma.userProgress.findMany({
      where: {
        userId: userId,
        chapter: {
          courseId: courseId,
        }
      }
    });

    // Retornamos la lista de progresos puros: [{ chapterId: "1", isCompleted: true }, ...]
    return toProgressDtoList(progressRecords);
    
  } catch (error) {
    console.error("[GET_USER_PROGRESS_ERROR]", error);
    return [];
  }
}