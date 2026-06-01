"use client";

import { CourseWithChaptersDTO } from "@/types/mappers/chapter.mapper";
import Image from "next/image";
import Link from "next/link";
import { IconBadge } from "../IconBadge";
import { BookOpen, ChartArea, ChartNoAxesColumn } from "lucide-react";

interface ListCoursesProps {
  title: string;
  courses: CourseWithChaptersDTO[];
}

export const ListCourses = ({ title, courses }: ListCoursesProps) => {
  return (
    <div className="mx-4 my-6 rounded-3xl border border-slate-200 bg-slate-50 p-4 md:mx-6 md:p-6 shadow-sm">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
        <p className="text-sm text-slate-500">
          Encuentra el curso ideal para ti 🚀
        </p>
      </div>

      <div className="border-b border-slate-200" />

      {courses?.length ? (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/courses/${course.slug}`}
              className="
group
relative
overflow-hidden
rounded-2xl
border
bg-white
transition-all
duration-300
hover:-translate-y-1
hover:shadow-xl
"
            >
              {/* categoría */}
              <span className="absolute top-2 right-2 z-10 px-2 py-1 bg-white text-violet-500 font-medium rounded-full text-xs shadow-sm">
                {course.category}
              </span>

              {/* imagen */}
              <div
                className="relative w-full overflow-hidden rounded-t-2xl bg-slate-900" // Fondo oscuro para que combine con tus banners si se ven franjas
                style={{ height: "160px" }}
              >
                <Image
                  src={course.imageUrl || "/default-image.png"}
                  alt={course.title}
                  fill
                  quality={85}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw,
         (max-width: 1200px) 50vw,
         33vw"
                />
              </div>
              {/* contenido */}
              <div className="p-2">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {course.title}
                </h3>

                {/* capitulos */}
                <div className="flex items-center gap-2 justify-between mt-2 ">
                 <IconBadge
                 icon={BookOpen}
                 text={`${course.chapters.length} capítulos`}
                 />

                 <IconBadge
                 icon={ChartNoAxesColumn}
                 text={course.level || ""}
                 />
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="mt-6 text-center text-slate-500">
          No hay cursos disponibles.
        </p>
      )}
    </div>
  );
};
