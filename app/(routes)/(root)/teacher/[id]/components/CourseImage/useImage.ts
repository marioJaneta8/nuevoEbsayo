"use client";

import { CourseResponse } from "@/types/course";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios"; 
import { toast } from "sonner"; 

interface UseImageProps {
  id: string;
}

export const useImage = ({ id }: UseImageProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (imageUrl: string | null): Promise<CourseResponse> => {
      const res = await axios.patch(`/api/course/${id}`, { imageUrl });
      return res.data;
    },

    onSuccess: (result) => {
      if (result.success) {
        toast.success("Imagen actualizada");
         queryClient.setQueryData(["course", id],result.data);
           } else {
        toast.error(result.error || "Error al actualizar imagen");
      }
    },

    onError: (error) => {
      console.error("[COURSE_PUBLISH_CLIENT]", error);
      toast.error("Error del servidor");
    },
  });

  return mutation;
};