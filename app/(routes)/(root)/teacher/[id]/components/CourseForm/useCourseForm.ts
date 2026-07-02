"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { toast } from "sonner";
import { FormCourseType } from "./CouseFormType";
import { CourseResponse } from "@/types/course";


interface UseCourseProps {
  id: string;
}


export const useCourseForm = ({ id }: UseCourseProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async(values:FormCourseType):Promise<CourseResponse>=> {
     const res= await axios.patch(`/api/course/${id}`, values);
     return res.data;
    },

    onSuccess: (result) => {
      if(result.success) {
      toast.success("Curso actualizado correctamente");
      queryClient.invalidateQueries({queryKey:["course", id]});
      }else {
        toast.error(result.error || "Error desconocido al actualizar el curso");
      }
    },

    onError: (error) => {
      console.error("[COURSE_PUBLISH_CLIENT]", error);
      toast.error("error del servidor al actualizar el curso ");
    },
  });
  return mutation;
};


//get course by id

export const useGetCourseById = ({ id }: UseCourseProps) => {
  return useQuery({
    queryKey: ["course", id],
    queryFn: async (): Promise<CourseResponse> => {
      const res = await axios.get<CourseResponse>(`/api/course/${id}`);

      return res.data;
    },
    staleTime: 3000,
    enabled: !!id,
  });
};