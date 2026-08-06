import { prisma } from "@/lib/prisma";
//se encarga de obtener el progreso del usuario
export const getUserProgressByCourse = async (userId:string,courseId:string):Promise<number> => {
    try {
        
        const purchases = await prisma.purchase.findFirst({
            where: {
                userId: userId,
                courseId: courseId,
                
            }
        })


        if(!purchases){
            return 0;
        }


        const totalChapter = await prisma.chapter.count({
            where: {
                courseId: courseId,
                isPublished: true,
            }
        })

        if(totalChapter === 0){
            return 0;
        }

        const completedChapter = await prisma.userProgress.count({
            where: {
                userId: userId,
                isCompleted: true,
                chapter:{
                    courseId:courseId,
                    isPublished:true,
                }
            }
        })

      

      const percentage = Math.round((completedChapter / totalChapter) * 100);

      return percentage;
        
    } catch (error) {
       console.log("[GET_USER_PROGRESS_BY_COURSE_ERROR]", error);
        return 0;
    }
}