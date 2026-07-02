"use client";
import { CourseResponse } from "@/types/course";
import { useMutation,useQuery,useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface UseCourseProps {
  id: string;
}

export const usePublishCourse = ({ id }: UseCourseProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (state: boolean) => {
      const res = await axios.patch(`/api/course/${id}`, {
        isPublished: state,
      });
      return res.data;
    },

    onSuccess: (result) => {
      if (result.success) {
       
        toast.success("Estado del Curso Actualizado")

        queryClient.invalidateQueries({
          queryKey: ["course", id],
        });
      }
    },

    onError: () => {
      toast.error("Error al cambiar estado");
    },
  });
  
};


export const useDeleteCourse =  ({id}: UseCourseProps) => {
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
   

// Hook para obtener los detalles de un curso específico
export const useGetCourse = ({id}: UseCourseProps) => {
 return useQuery({
    queryKey: ["course", id],
    queryFn: async ():Promise<CourseResponse> => {
      const res = await axios.get<CourseResponse>(`/api/course/${id}`);
      return res.data;
    },

    enabled: !!id,
    staleTime: 1000 * 30, // 5 minutos
  });







}