"use client";

import { CourseCardDTO } from "@/types/mappers/chapter.mapper";
import Image from "next/image";
import Link from "next/link";
import { IconBadge } from "../IconBadge";
import { BookOpen, ChartNoAxesColumn } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { formatPrice } from "@/lib/formatPrice";

interface ListCoursesProps {
  title: string;
  courses: CourseCardDTO[];
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
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course) => {
            const progress = course.progressPercentage ?? 0;

            const hasProgress = progress > 0;

           

            return (
              <Link
                key={course.id}
                href={`/courses/${course.slug}`}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Imagen */}
                <div className="overflow-hidden rounded-t-2xl">
                  <Image
                    src={course.imageUrl || "/default-image.png"}
                    alt={course.title}
                    width={400}
                    height={225}
                    className="w-full h-32 object-cover"
                    unoptimized
                  />
                </div>
                {/* Contenido */}
                <div className="flex flex-col p-4">
                  <h3 className="line-clamp-2 min-h-12 text-base font-bold text-slate-800">
                    {course.title}
                  </h3>

                  <div className="mt-3 flex gap-2">
                    <IconBadge
                      icon={BookOpen}
                      text={`${course.chapters.length} capítulos`}
                    />

                    {course.level && (
                      <IconBadge icon={ChartNoAxesColumn} text={course.level} />
                    )}
                  </div>

                  <div className="mt-4 border-t pt-3">
                    {hasProgress ? (
                      <>
                        <div className="mb-1 flex justify-between text-xs">
                          <span>Progreso</span>
                          <span>
                            <Progress value={progress} className="w-24" />
                            <p className="text-xs text-slate-500">
                              {progress}% Completado
                            </p>
                          </span>
                        </div>

                        <div className="h-2 w-full rounded-full bg-slate-200">
                          <div
                            className="h-2 rounded-full bg-violet-600"
                            style={{
                              width: `${progress}%`,
                            }}
                          />
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400">
                          Inversión
                        </span>

                        <span className="font-bold">
                          {course.price === 0
                            ? "Gratis"
                            : formatPrice(course.price)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="mt-6 text-center text-slate-500">
          No hay cursos disponibles.
        </p>
      )}
    </div>
  );
};
