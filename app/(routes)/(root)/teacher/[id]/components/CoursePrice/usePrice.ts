
import { CourseResponse } from "@/types/course";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { use } from "react";
import { toast } from "sonner";

interface UserCourseProps {
  id: string;
  
}
export const usePriceCourse= ({ id }: UserCourseProps) => {
 const queryClient = useQueryClient();

 const mutation= useMutation({
    mutationFn: async (newPrice: number): Promise<CourseResponse> => {
      const res = await axios.patch(`/api/course/${id}`, { price: newPrice });
      return res.data;
    },
    onSuccess: (result) => {
      if(result.success){
        toast.success("Precio actualizado");
        queryClient.setQueryData(["course", id], result.data);
      }else{
        toast.error(result.error || "Error al actualizar el precio");
      }

    },

    onError: (error) => {
      console.error("[COURSE_PRICE_CLIENT]", error);
      toast.error("Error del servidor");
    },

 })
  return mutation;

 }



