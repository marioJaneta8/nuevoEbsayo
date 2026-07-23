import { getCourseBySlug } from "@/actions/getCourseBySlug";
import { getPurchasedCourse } from "@/actions/getPurchasedCourse";
import { getUserProgress } from "@/actions/getUserProgress";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import InfoCourse from "./components/infocourse/InfoCourse";
import { ChapterCourse } from "./components/chapterCourse";

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ courseSlug: string; chaptersCourse: string }>;
}) {
  const { courseSlug, chaptersCourse } = await params;

  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // Obtener informacion del curso
  const infoCourse = await getCourseBySlug(courseSlug);

  console.log("infoCourse", infoCourse);

  if (!infoCourse) {
    return redirect(`/courses/${courseSlug}`);
  }

  // Buscar el capitulo actual del servidor

  const currentChapter = infoCourse.chapters.find(
    (chapter) => chapter.id === chaptersCourse,
  );

  if (!currentChapter) {
    return redirect(`/courses/${courseSlug}`);
  }



  
  //Obtener el progreso del usuario en este curso
  const userProgress = await getUserProgress(infoCourse.id);

  // Verificar si el curso fue comprado
  const isPurchased = await getPurchasedCourse(userId, infoCourse.id);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-[65%_1fr] gap-6">
        <InfoCourse
          infoCourse={infoCourse}
          chapterCourseId={chaptersCourse}
          userProgress={userProgress}
          purchasedCourse={isPurchased ?? false}
        />
       <ChapterCourse
       chapters={(infoCourse.chapters)}
       courseSlug={courseSlug}
       chapterCurrent={currentChapter}
       userProgress={userProgress}
      
       
       
       
       />
      </div>
    </div>
  );
}
