"use client";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface UseCourseProps {
  id: string;
}

export const useCourse = ({ id }: UseCourseProps) => {
  const queryClient = useQueryClient();
  
    const mutation = useMutation({      
    mutationFn: async (state: boolean) => {
      await axios.patch(`/api/course/${id}`, {
        isPublished: state,
    
      });
    },
    onSuccess: () => {
        toast.success("Estado de publicación del curso actualizado");
        queryClient.invalidateQueries({ queryKey: ["course", id] });
           
    },
    onError: (error) => {
      console.error("[COURSE_PUBLISH_CLIENT]", error);
      toast.error("No se pudo actualizar el estado de publicación del curso");
    },
  });   
  return mutation;
}; 


export const onDeleteCourse =  ({id}: UseCourseProps) => {
    const queryClient = useQueryClient();
    const router = useRouter();
   
    const mutation = useMutation({
        mutationFn: async () => {
            await axios.delete(`/api/course/${id}`);  
        },
        onSuccess: () => {
            toast.success("Curso eliminado correctamente");
            // refrescar la lista de cursos y redirigir al usuario a la página de cursos 
            queryClient.invalidateQueries({ 
            queryKey: ["courses"] 
        });
          
            router.push("/teacher");
        },
  
    onError: (error) => {
      console.error("[COURSE_DELETE_CLIENT]", error);
      toast.error("No se pudo eliminar el curso");
    },
  });
   
    return mutation;
}  
   
