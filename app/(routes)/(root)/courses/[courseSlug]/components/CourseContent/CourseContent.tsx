import { ChapterDTO } from "@/types/chapterDto";
import { PlayCircle, Lock, BadgeCheck } from "lucide-react";

interface Props {
  chapters: ChapterDTO[];
}

export const CourseContent = ({ chapters }: Props) => {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-slate-900">
          Contenido del curso
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          {chapters.length} capítulos disponibles
        </p>
      </div>

      <div className="space-y-3">
        {chapters.map((chapter, index) => (
          <div
            key={chapter.id}
            className="
              group
              flex
              items-center
              gap-4
              rounded-xl
              border
              border-slate-200
              bg-white
              p-4
              transition-all
              hover:border-violet-300
              hover:bg-violet-50/50
            "
          >
            {/* Número */}
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-violet-100
                font-bold
                text-violet-700
              "
            >
              {index + 1}
            </div>

            {/* Información */}
            <div className="flex-1">
              <h4 className="font-semibold text-slate-800 group-hover:text-violet-700">
                {chapter.title}
              </h4>
             
              <div className="shrink-0 flex items-center justify-center">

                <span
                className={`px-2 py-1 text-xs rounded-full font-medium 
                ${chapter.isPublished ? 
                "bg-green-100 text-green-800" 
                : "bg-red-100 text-red-700"}`}
                
                >
                  {chapter.isPublished ? "Publicado" : "Sin Publicar"}
                </span>



              </div>


            </div>
          </div>
        ))}
      </div>  
    </div>
  );
};