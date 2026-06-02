import { prisma } from "@/lib/prisma";
import { CourseProgressDTO } from "@/types/mappers/progress.mapper";

export async function getUserProgressByCourse(
  userId: string,
  courseId: string
): Promise<CourseProgressDTO> {
  try {

    // Verificar si el usuario ha comprado el curso
    const purchase = await prisma.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    if (!purchase) {
      return {
        progressPercentage: 0,
      };
    }
// Contar el total de capítulos publicados y los capítulos completados por el usuario
    const [totalChapters, completedChapters] =
      await Promise.all([
        prisma.chapter.count({
          where: {
            courseId,
            isPublished: true,
          },
        }),

        prisma.userProgress.count({
          where: {
            userId,
            isCompleted: true,
            chapter: {
              courseId,
              isPublished: true,
            },
          },
        }),
      ]);

    if (totalChapters === 0) {
      return {
        progressPercentage: 0,
      };
    }

    return {
      progressPercentage: Math.round(
        (completedChapters / totalChapters) * 100
      ),
    };
  } catch (error) {
    console.log(
      "[GET_USER_PROGRESS_BY_COURSE]",
      error
    );

    return {
      progressPercentage: 0,
    };
  }
}