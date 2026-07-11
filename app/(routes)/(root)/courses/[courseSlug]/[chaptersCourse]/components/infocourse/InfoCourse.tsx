'use client'
import { CourseWithChaptersDTO } from "@/types/mappers/chapter.mapper";
import { ProgressDTO } from "@/types/progressDto";
import { Lock, VideoOff } from "lucide-react"; // Añadí VideoOff como sugerencia
import VideoUrl from "./videoUrl/VideoUrl";
import ProgressCourse from "./ProgressCourse/ProgressCourse";

interface InfoCourseProps {
  infoCourse: CourseWithChaptersDTO;
  chapterCourseId: string;
  userProgress: ProgressDTO[];
  purchasedCourse: boolean;
}

const InfoCourse = ({
  infoCourse,
  chapterCourseId,
  userProgress,
  purchasedCourse,
}: InfoCourseProps) => {

  // 1. TU LÓGICA: Encontramos el capítulo actual una sola vez
  const currentChapter = infoCourse.chapters.find(
    (chapter) => chapter.id === chapterCourseId
  );

  const totalChapter= infoCourse.chapters.length;
  const completeChapters= userProgress.filter((progress)=>progress.isCompleted===true).length;

  const progressPercentage = totalChapter > 0 
  ? Math.round((completeChapters / totalChapter) * 100) 
  : 0;

  return (
    <div className="w-full relative">
      
      {/* TÍTULO */}
      <div className="text-3xl font-bold mb-4">
        {currentChapter?.title}
      </div>

      {/* ÁREA DEL REPRODUCTOR */}
      <div className="relative aspect-video bg-slate-200 rounded-md overflow-hidden flex items-center justify-center">
        
        {!purchasedCourse ? (
          
          // BLOQUEO: Si NO ha comprado
          <div className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-md bg-slate-900/60 gap-y-2 h-full z-30 rounded-md text-white">
             <Lock className="h-8 w-8" />
             <p className="font-semibold text-lg">Debes comprar el curso para ver este video</p>
          </div>
          
        ) : (
          
          // VERIFICACIÓN DE VIDEO: Usando tu lógica modular
          currentChapter?.videoUrl ? (
            <VideoUrl videoUrl={currentChapter.videoUrl} />
          ) : (
            // Mensaje de respaldo por si el capítulo no tiene video (ej. es solo lectura)
            <div className="flex flex-col items-center text-slate-500">
              <VideoOff className="h-10 w-10 mb-2" />
              <p>Este capítulo no contiene video</p>
            </div>
          )
          
        )}

        
      


      </div>
        <ProgressCourse
        progressPercentage={progressPercentage}
        completeChapters={completeChapters}
        totalChapter={totalChapter}
        />
      
    </div>
  );
};

export default InfoCourse;