import {prisma} from "@/lib/prisma";

export const getAuthorizedChapter = async ({id, chapterId,userId} : {
    id: string;
    chapterId: string;
    userId: string;
}) => {
    return prisma.chapter.findFirst({
        where: {
            id: chapterId,
            courseId: id,
            course: {
                userId
            }
        },
        select: {
            id: true
        }
    });
};
