"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

export const ExploreCourse = () => {
  const router = useRouter();

  return (
    <div className="mx-6 my-4 overflow-hidden rounded-xl border bg-white">
      <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 p-6">
        
        {/* TEXTO */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Explora todos los cursos disponibles 👋
          </h1>

          <p className="max-w-xl text-muted-foreground text-sm md:text-base">
            Empieza a aprender a programar desde cero con estos cursos.
            No necesitas experiencia previa, solo ganas de aprender.
            Explora una variedad de temas y encuentra el curso perfecto
            para ti.
          </p>

          <Button
            onClick={() => router.push("/courses")}
            className="w-fit"
          >
            Empezar a aprender
          </Button>
        </div>

        {/* IMAGEN */}
        <div className="flex justify-center md:justify-end">
          <Image
            src="/explore.png"
            alt="Imagen de exploración de cursos"
            width={500}
            height={500}
            className="h-auto w-full max-w-md object-contain"
            priority
          />


          
        </div>
      </div>
    </div>
  );
};