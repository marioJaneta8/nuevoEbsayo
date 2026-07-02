"use client";
import { Button } from "@/components/ui/button";
import { CourseDTO } from "@/types/course";
import { Eye, EyeOff, MoveLeft, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

import { useDeleteCourse, usePublishCourse, useGetCourse } from "./useCourse";


interface HeaderCourseProps {
  course: CourseDTO;
  isPublished: boolean;
}

export const HeaderCourse = ({ course, isPublished }: HeaderCourseProps) => {
  const { mutate: togglePublish, isPending } = usePublishCourse({
    id: course.id,
  });
  const { mutate: deleteCourse, isPending: isDeleting } = useDeleteCourse({
    id: course.id,
  });

  const { data: courseData } = useGetCourse(
  { id: course.id });


  const  currenData= courseData?.data ?? course;

  const router = useRouter();
  const requireFields = [
    currenData.title,
    currenData.description,
    currenData.slug,
    currenData.category,
    currenData.level,
    currenData.imageUrl
  ];

 

  const canPublish = requireFields.every(Boolean);

  // aqui paso el estado del curso a la funcion onPublishCourse, que se encarga de hacer la peticion al backend para actualizar el estado de publicacion del curso
  const onPublishCourse =  (state: boolean) => {
    togglePublish(state);
  };

  const onRemoveCourse = () => {
    deleteCourse();
  };

  return (
    <div>
      <div className="mb-4">
        <div className="flex flex-col  md:flex-row justify-between items-center">
          <Button onClick={() => router.push("/teacher")}>
            <MoveLeft />
            Volver a todos los cursos.
          </Button>

          {/* mensaje Antes De publicar */}

          {!canPublish && (
            <p className="text-sm text-red-500">
              Completa todos los campos antes de publicar
            </p>
          )}

          <div className="gap-2 flex items-center">
            {currenData.isPublished ? (
              <Button
                variant="outline"
                onClick={() => onPublishCourse(false)}
                disabled={isPending}
              >
                Despublicar Curso
                <EyeOff />
              </Button>
            ) : (
              <Button
                variant="outline"
                disabled={isPending || !canPublish}
                onClick={() => onPublishCourse(true)}
              >
                Publicar Curso
                <Eye />
              </Button>
            )}
          </div>

          <Button
            variant="destructive"
            onClick={onRemoveCourse}
            disabled={isPending || isDeleting}
          >
            <Trash2Icon />
          </Button>
        </div>
      </div>
    </div>
  );
};
