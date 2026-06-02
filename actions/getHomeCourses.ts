import { prisma } from "@/lib/prisma";

import { CourseCardDTO, toCourseCardDTO } from "@/types/mappers/chapter.mapper";
import { getUserProgressByCourse } from "./getUserProgressByCourse";
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
      return courses.map((course) => toCourseCardDTO(course));
    }

    return await Promise.all(
      courses.map(async (course) => {
        const progress =
          await getUserProgressByCourse(
            userId,
            course.id
          );

        return toCourseCardDTO(
          course,
          progress.progressPercentage
        );
      })
    );
  } catch (error) {
    console.log("[GET_HOME_COURSES]", error);

    return [];
  }
}
