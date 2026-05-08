'use client';

import { Button } from "@/components/ui/button";
import { CourseDTO } from "@/types/course";
import { Edit, Trash2Icon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useRouter } from "next/navigation";
import { useActionEliminar } from "./useActionEliminar";

interface Props {
  course: CourseDTO;
}

export const Action = ({ course }: Props) => {
  const { mutate, isPending } = useActionEliminar({ id: course.id });
  const router = useRouter();

  const editCourse = () => {
    router.push(`/teacher/${course.id}`);
  };

  

  return (
    <div className="flex flex-col gap-2 items-center w-full lg:max-w-42">

      <Button className="w-full" onClick={editCourse}>
        Editar <Edit className="w-4 h-4" />
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" className="w-full">
            Eliminar <Trash2Icon className="w-4 h-4" />
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esto borrará el curso y todos sus datos.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={()=>mutate()}
              disabled={isPending}
              className="bg-red-500"
            >
              {isPending ? "Eliminando..." : "Continuar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
};