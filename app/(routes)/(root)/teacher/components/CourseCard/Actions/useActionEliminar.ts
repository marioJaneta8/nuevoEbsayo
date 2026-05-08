'use client';
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UseActionEliminarProps {
 id:string;
}

export const useActionEliminar =({ id }: UseActionEliminarProps) => {
  const router = useRouter();
  const queryClient = useQueryClient(); 
  const mutation = useMutation({
    mutationFn: async( )=>{
        await axios.delete(`/api/course/${id}`);
    },      
    onSuccess: () => {
      toast.success("Curso Eliminado correctamente");
      queryClient.invalidateQueries({ 
        queryKey: ["courses"],
      });
      router.refresh();
    },
    onError: (error) => {
      console.log("Error deleting course", error);  
      toast.error("Error al eliminar el curso");       
    },
  });
  return mutation;
}