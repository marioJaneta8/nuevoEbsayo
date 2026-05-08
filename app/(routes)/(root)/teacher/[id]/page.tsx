//server component para cargar el curso y pasar el dto a los componentes cliente



import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { HeaderCourse } from "./components/HeaderCourse";
import { ChapterBlock, CourseForm, CoursePrice } from "./components";

//TIPADO Curso Completo para el formulario de edicion del curso

import {
  toCourseWithChaptersDTO,
  CourseWithChaptersDTO,
} from "@/types/mappers/chapter.mapper";
import CourseImage from "./components/CourseImage/CourseImage";

interface TeacherCoursePageProps {
  params: Promise<{ id: string }>;
}

export default async function TeacherCoursePage({
  params,
}: TeacherCoursePageProps) {
  const { id } = await params;
  const { userId } = await auth();


  

  if (!userId) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold">Acceso denegado</h1>
      </div>
    );
  }

  const course = await prisma.course.findUnique({
    where: {
      id,
      userId,
    },
    include: {
    chapters: {
      orderBy: {
        position: "asc",
      }
    },
    },
  });

  if (!course || course.userId !== userId) {
    return <p className="text-red-500">Este curso no existe.</p>;
  }

  // Tipado explícito para consumo de componentes cliente.
  //const courseDto: CourseDTO = toCourseDTO(course);

  //tipado Chapters para el formulario de edicion del curso

  const courseDto: CourseWithChaptersDTO = toCourseWithChaptersDTO(course);

  return (
    <div className="m-6">
      <HeaderCourse
        course={courseDto}
        isPublished={courseDto.isPublished || false}
      />
      {/* Aquí iría el resto del contenido del curso, como el formulario de edición, etc. */}
    
      <CourseForm course={courseDto} />


    <div className="grid grid-cols-1  md:grid-cols-2 gap-4 my-4">
        {/* Aquí podrías agregar más componentes relacionados con el curso, como la lista de capítulos, etc. */}

      {/* Componente para mostrar la imagen del curso */}
       <CourseImage 
        id={courseDto.id}
        imageUrl={courseDto.imageUrl || null}
       />
      
      
      <CoursePrice
      
      id={courseDto.id}
      price={courseDto.price ?? null}
      />

    </div>
  

   {/* // Componente para mostrar la lista de capítulos del curso */}


 <ChapterBlock id={courseDto.id} />

    </div>
  );
}
