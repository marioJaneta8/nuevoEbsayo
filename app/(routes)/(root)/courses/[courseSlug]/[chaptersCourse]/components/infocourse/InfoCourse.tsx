"use client";
import { CourseWithChaptersDTO } from "@/types/mappers/chapter.mapper";
import { ProgressDTO } from "@/types/progressDto";
import { Lock, VideoOff } from "lucide-react"; // Añadí VideoOff como sugerencia
import VideoUrl from "./videoUrl/VideoUrl";
import ProgressCourse from "./ProgressCourse/ProgressCourse";

//hooks
import { useProgress } from "./useProgress";

interface InfoCourseProps {
  infoCourse: CourseWithChaptersDTO;
  chapterCourseId: string;
  userProgress: ProgressDTO[];
  purchasedCourse: boolean;
}

const InfoCourse = ({
  infoCourse,
  chapterCourseId,
  userProgress: initialProgress,
  purchasedCourse,
}: InfoCourseProps) => {
  // 1. TANSTACK QUERY: Obtenemos el progreso reactivo de este curso (id)
  const { data: progressResponse } = useProgress({
    id: infoCourse.id,
    initialData: initialProgress,
  });

  const currentUserProgress = progressResponse?.data ?? [];

  

  // 1. TU LÓGICA: Encontramos el capítulo actual una sola vez
  const currentChapter = infoCourse.chapters.find(
    (chapter) => chapter.id === chapterCourseId,
  );

  const totalChapter = infoCourse.chapters.length;
  //contar los capitulos completados
  const completeChapters = currentUserProgress.filter(
    (progress) => progress.isCompleted === true,
  ).length;

  //porcentaje de completitud
  const progressPercentage =
    totalChapter > 0 ? Math.round((completeChapters / totalChapter) * 100) : 0;

  return (
    <div className="w-full relative">
      {/* TÍTULO */}
      <div className="text-3xl font-bold mb-4">{currentChapter?.title}</div>

      {/* ÁREA DEL REPRODUCTOR */}
      <div className="relative aspect-video bg-slate-200 rounded-md overflow-hidden flex items-center justify-center">
        {!purchasedCourse ? (
          // BLOQUEO: Si NO ha comprado
          <div className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-md bg-slate-900/60 gap-y-2 h-full z-30 rounded-md text-white">
            <Lock className="h-8 w-8" />
            <p className="font-semibold text-lg">
              Debes comprar el curso para ver este video
            </p>
          </div>
        ) : // VERIFICACIÓN DE VIDEO: Usando tu lógica modular
        currentChapter?.videoUrl ? (
          <VideoUrl
            videoUrl={currentChapter.videoUrl}
            id={infoCourse.id}
            chapterId={currentChapter.id}
          />
        ) : (
          // Mensaje de respaldo por si el capítulo no tiene video (ej. es solo lectura)
          <div className="flex flex-col items-center text-slate-500">
            <VideoOff className="h-10 w-10 mb-2" />
            <p>Este capítulo no contiene video</p>
          </div>
        )}
      </div>
      <ProgressCourse
        progressPercentage={progressPercentage}
        completeChapters={completeChapters}
        totalChapter={totalChapter}
      />

      <div className="mt-4 bg-white rounded-md p-6  shadow-md ">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {infoCourse.title}{" "}
        </h2>

        <div className="w-fit mb-4 px-2 py-1 bg-violet-400 text-white rounded-full text-xs shadow-md">
          {infoCourse.category}
        </div>

        <p className="text-gray-600 text-sm">{infoCourse.description}</p>
      </div>
    </div>
  );
};

export default InfoCourse;
