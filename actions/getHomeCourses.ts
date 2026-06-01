import { prisma } from "@/lib/prisma";
import { CourseWithChaptersDTO } from "@/types/mappers/chapter.mapper";
import { toCourseWithChaptersDTO } from "@/types/mappers/chapter.mapper";

export async function getHomeCourses(): Promise<CourseWithChaptersDTO[]> {
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

    return courses.map(toCourseWithChaptersDTO);
  } catch (error) {
    console.log("[GET_HOME_COURSES]", error);

    return [];
  }
}
