"use client";

import { IconBadge } from "@/components/Shared";
import { Button } from "@/components/ui/button";
import { CourseWithChaptersDTO } from "@/types/mappers/chapter.mapper";
import { Calendar, Timer, BookOpen, ChartNoAxesColumn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

interface IHeroBlockCourse {
  course: CourseWithChaptersDTO;
  purchaseCourse: boolean;
}

export const HeroBlockCourse = ({
  course,
  purchaseCourse,
}: IHeroBlockCourse) => {
  const {
    title,
    chapters,
    description,
    price,
    imageUrl,
    updatedAt,
    slug,
    level,
  } = course;

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();


  //comprar El curso
  const enrollCourse = async()=>{
    console.log("click")
    //router.push("/checkout"
  }

//despues de haber comprado el curso, ir al primer capítulo
const redirectCourse = async()=>{
  router.push(`/courses/${slug}/${chapters[0].id}`)
}


  return (
    <section className="mt-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 items-center">
        {/* IZQUIERDA */}
        <div className="space-y-6">
          <div>
            <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
              Curso Online
            </span>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
              {title}
            </h1>

            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              {description}
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <IconBadge
              icon={BookOpen}
              text={`${chapters.length} capítulos`}
            />

            <IconBadge
              icon={Timer}
              text="7h 40 minutos"
            />

            <IconBadge
              icon={Calendar}
              text={new Date(updatedAt!).toLocaleDateString(
                "es-CL",
                {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                }
              )}
            />


            <IconBadge icon={ChartNoAxesColumn} text={level ||""}/>
              
       



          </div>

          <div className="flex items-center gap-4">
            <span className="text-4xl font-extrabold text-violet-700">
              {price === 0 ? "Gratis" : `$${price}`}
            </span>
          </div>

          {purchaseCourse ? (
            <Button
              size="lg"
              disabled={isLoading}
              onClick={redirectCourse}
              
              className="rounded-xl px-8"
            >
              Continuar curso
            </Button>
          ) : (
            <Button
              size="lg"
              disabled={isLoading}
              onClick={enrollCourse}
              className="rounded-xl px-8"
            >
              Inscribirse ahora
            </Button>
          )}
        </div>

        {/* DERECHA */}
        <div className="relative">
          <div className="absolute inset-0 rounded-3xl bg-violet-500/10 blur-3xl" />

          <div className="relative overflow-hidden rounded-3xl border bg-white shadow-2xl">
            <Image
              src={imageUrl || "/default-image.png"}
              alt={title}
              width={500}
              height={400}
              priority
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};