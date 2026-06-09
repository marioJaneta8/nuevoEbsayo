import { prisma } from "@/lib/prisma";

export async function getPurchaseCourse(
  userId: string,
  courseId: string,
): Promise<boolean | null> {
  try {
  const purchase = await prisma.purchase.findUnique({
  where: {
    userId_courseId: {
      userId,
      courseId,
    },
  },
  include: {
    course: true,
  },
});

    return !!purchase;
  } catch (error) {
    console.error("[getPurchaseCourse]", error);
    return false;
  }
}
