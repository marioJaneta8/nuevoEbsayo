// aqui vamos saber si tenemos un curso Comprado
import { prisma } from "@/lib/prisma";

export async function getPurchasedCourse(
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

        });

        return !!purchase;
    } catch (error) {
        console.error("[getPurchaseCourse]", error);
        return false;
    }
}