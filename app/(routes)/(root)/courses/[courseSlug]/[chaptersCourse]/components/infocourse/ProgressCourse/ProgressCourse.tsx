"use client";

interface ProgressCourseProps {
  progressPercentage: number;
  completeChapters: number;
  totalChapter: number;
}

const ProgressCourse = ({
  progressPercentage,
  completeChapters,
  totalChapter,
}: ProgressCourseProps) => {
  return (
    <div className="mt-2 w-full flex flex-col gap-2 p-4 border rounded-md shadow-sm bg-white">
      
      <div className="flex items-center justify-between font-medium text-slate-700">
        <span className="text-sm">Avance del curso</span>
        <span className="text-sm">{progressPercentage}%</span>
      </div>
      
      {/* El fondo de la barra (Gris) */}
      <div className="w-full bg-slate-200 rounded-full h-2.5">
        {/* El relleno de la barra (Verde o Azul) que crece según el porcentaje */}
        <div 
          className="bg-sky-600 h-2.5 rounded-full transition-all duration-500 ease-in-out" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      <p className="text-xs text-slate-500 text-right">
        {completeChapters} de {totalChapter} capítulos completados
      </p>
      
    </div>
  );
};

export default ProgressCourse;