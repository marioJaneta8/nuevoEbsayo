import { ChapterDTO } from "@/types/chapterDto";
import { PlayCircle, Lock, EyeOff } from "lucide-react";

interface Props {
  chapters: ChapterDTO[];
}

export const CourseContent = ({ chapters }: Props) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
      {/* Encabezado */}
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Contenido del curso
        </h2>
        <p className="mt-1.5 text-sm text-slate-500 font-medium">
          {chapters.length} {chapters.length === 1 ? "capítulo disponible" : "capítulos disponibles"}
        </p>
      </div>

      {/* Lista de Capítulos */}
      <div className="space-y-3">
        {chapters.map((chapter, index) => (
          <div
            key={chapter.id}
            className="
              group
              flex
              flex-col
              sm:flex-row
              sm:items-center
              gap-4
              rounded-xl
              border
              border-slate-200
              bg-white
              p-4
              transition-all
              duration-200
              hover:border-violet-300
              hover:bg-violet-50/30
              hover:shadow-sm
            "
          >
            {/* Contenedor Izquierdo: Número e Información */}
            <div className="flex items-start sm:items-center gap-4 flex-1">
              {/* Número / Icono */}
              <div
                className={`
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  font-bold
                  text-sm
                  transition-colors
                  ${chapter.isPublished 
                    ? "bg-violet-100 text-green-800 group-hover:bg-violet-600 group-hover:text-white" 
                    : "bg-slate-100 text-slate-500"
                  }
                `}
              >
                {/* Cambia el número por un ícono de play al hacer hover si está publicado */}
                <span className="group-hover:hidden">{index + 1}</span>
                {chapter.isPublished ? (
                  <PlayCircle className="hidden h-5 w-5 group-hover:block animate-in fade-in zoom-in-75 duration-150" />
                ) : (
                  <Lock className="hidden h-4 w-4 group-hover:block" />
                )}
              </div>

              {/* Título */}
              <div className="space-y-1">
                <h4 className="font-semibold text-slate-800 transition-colors group-hover:text-violet-900 text-sm sm:text-base">
                  {chapter.title}
                </h4>
              </div>
            </div>

            {/* Contenedor Derecho: Badge de Estado (Responsivo) */}
            <div className="flex items-center pl-14 sm:pl-0 sm:justify-end shrink-0">
              <span
                className={`
                  inline-flex
                  items-center
                  gap-1.5
                  px-2.5
                  py-1
                  text-xs
                  rounded-md
                  font-semibold
                  tracking-wide
                  transition-colors
                  ${chapter.isPublished 
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60" 
                  : "bg-slate-100 text-slate-600 border border-slate-200"
                }
              `}
              >
                {chapter.isPublished ? (
                  <>
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-800 animate-pulse" />
                    Publicado
                  </>
                ) : (
                  <>
                    <EyeOff className="h-3 w-3 text-slate-400" />
                   Sin Publicar
                  </>
                )}
              </span>
            </div>
          </div>
        ))}
      </div>  
    </div>
  );
};