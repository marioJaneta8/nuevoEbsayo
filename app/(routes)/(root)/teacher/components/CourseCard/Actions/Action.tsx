
'use client'

import { Button } from "@/components/ui/button";
import { CourseDTO } from "@/types/course";
import { Edit } from "lucide-react";

import { Trash2Icon } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
interface Props {
  course: CourseDTO;
}


export const Action = ({course}:Props) => {
  
  const {id} = course;

  const router = useRouter();


// funcionalidad Editar

 const editCourse= ()=>{
  router.push(`/teacher/${id}`);
 }

// construccionApiEliminar 

const deleteCourse = async()=>{
  try{

    axios.delete(`/api/course/${id}`);
    toast.success("Curso Eliminado correcamente");
    router.refresh();
  }catch(error){
    console.log("Error deleting course", error);
  }

}
  return (
    <div className="flex flex-col gap-2 items-center w-full lg:max-w-42">
   
   <Button className="w-full" onClick={editCourse}>
    editar <Edit className="w-4 h-4"/>
   </Button>

<AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="w-full text-red-500 border-red-500 hover:bg-red-100 hover:text-red-500">
          Eliminar <Trash2Icon className="w-4 h-4"/>

        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>¿Estas Seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esto Borrara El Curso y Todos Sus Datos
           
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteCourse} variant="destructive">Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>


    </div>
  )
}

