import { prisma } from "@/lib/prisma";

import { toCourseWithChaptersDTO } from "@/types/mappers/chapter.mapper";

import { CourseWithChaptersDTO } from "@/types/mappers/chapter.mapper";

export async function getCourseBySlug(
  slug: string,
): Promise<CourseWithChaptersDTO | null> {
  try {
    const course = await prisma.course.findFirst({
      where: {
        slug,
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
    });

    if (!course) {
      return null;
    }

    return toCourseWithChaptersDTO(course);
  } catch (error) {
    console.error("Error fetching course by slug:", error);
    return null;
  }
}
