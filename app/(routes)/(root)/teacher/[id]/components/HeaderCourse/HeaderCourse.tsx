"use client";
import { Button } from "@/components/ui/button";
import { CourseDTO } from "@/types/course";
import { Eye, EyeOff, MoveLeft, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

import { onDeleteCourse, useCourse } from "./useCourse";
import { useState } from "react";
interface HeaderCourseProps {
  course: CourseDTO;
  isPublished: boolean;
}

export const HeaderCourse = ({ course, isPublished }: HeaderCourseProps) => {
  const { mutate, isPending } = useCourse({ id: course.id });
  const { mutate: deleteCourse,isPending: isDeleting } = onDeleteCourse({
    id: course.id,
  });
   
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // aqui paso el estado del curso a la funcion onPublishCourse, que se encarga de hacer la peticion al backend para actualizar el estado de publicacion del curso
  const onPublishCourse = async (state: boolean) => {
    setLoading(true);
    mutate(state, {
      onSettled: () => {
       setTimeout(() => setLoading(false), 500);
      },
    });
  };


  const onRemoveCourse = () => {
    setLoading(true);
    deleteCourse(undefined, {
      onSettled: () => {  
        setTimeout(() => setLoading(false), 500);
      },
    });
  };


  return (
    <div>
      <div className="mb-4">
        <div className="flex flex-col  md:flex-row justify-between items-center">
          <Button onClick={() => router.push("/teacher")}>
            <MoveLeft />
            Volver a todos los cursos.
          </Button>

          <div className="gap-2 flex items-center">
            {isPublished ? (
              <Button
                variant="outline"
                onClick={() => onPublishCourse(false)}
                disabled={isPending || loading}
              >
                Despublicar Curso
                <EyeOff />
              </Button>
            ) : (
              <Button
                variant="outline"
                disabled={isPending || loading}
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
            disabled={isPending || isDeleting || loading}
          >
            <Trash2Icon />
          </Button>
        </div>
      </div>
    </div>
  );
};
