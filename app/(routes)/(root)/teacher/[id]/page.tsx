import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { HeaderCourse } from "./components/HeaderCourse";
import { CourseForm } from "./components";

//TIPADO Curso Completo para el formulario de edicion del curso
import { toCourseDTO } from "@/types/mappers/course.mapper";
import { CourseDTO } from "@/types/course";

import {
  toCourseWithChaptersDTO,
  CourseWithChaptersDTO,
} from "@/types/mappers/chapter.mapper";

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
      id: id,
      userId: userId,
    },
    include: {
      chapters: true,
    },
  });

  if (!course) {
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
        isPublished={course.isPublished ?? false}
      />
      {/* Aquí iría el resto del contenido del curso, como el formulario de edición, etc. */}

      <CourseForm course={courseDto} />
    </div>
  );
}
