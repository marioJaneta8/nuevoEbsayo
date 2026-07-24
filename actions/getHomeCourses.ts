import { prisma } from "@/lib/prisma";

import { CourseCardDTO, toCourseCardDTO } from "@/types/mappers/chapter.mapper";
import { getUserProgress } from "./getUserProgress";
import { getPurchasedCourse } from "./getPurchasedCourse";
export async function getHomeCourses(
  userId?: string,
): Promise<CourseCardDTO[]> {
  try {
    const courses = await prisma.course.findMany({
      where: {
        isPublished: true,
      },

      include: {
        chapters: {
          where: {
            isPublished: true,
          },

          orderBy: {
            position: "asc",
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    // Sin usuario autenticado
    if (!userId) {
      return courses.map((course) => toCourseCardDTO(course, 0, false));
    }

    return await Promise.all(
      courses.map(async (course) => {
       

        //obtengo el progreso del usuario
        const progress = await getUserProgress(course.id);

        // Capítulos completados
        const completedChapters = progress.filter(
          (item) => item.isCompleted,
        ).length;

        // Total de capítulos publicados
        const totalChapters = course.chapters.length;

        // Calcular porcentaje
        const progressPercentage =
          totalChapters > 0
            ? Math.round((completedChapters / totalChapters) * 100)
            : 0;

            const isPurchased= await getPurchasedCourse(userId,course.id);

        return toCourseCardDTO(course, progressPercentage,isPurchased ?? false);
      }),
    );
  } catch (error) {
    console.log("[GET_HOME_COURSES]", error);

    return [];
  }
}
