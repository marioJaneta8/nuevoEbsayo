"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import axios,{AxiosError} from "axios";

import { toast } from "sonner";




import { ChapterResponse } from "@/types/chapterDto";
import { FormChapterNameType } from "./form.Chapter.type";
import { CourseResponse } from "@/types/course";

interface UseChapterBlockProps {
  id: string;
}

export const useChapterBlock = ({ id }: UseChapterBlockProps) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      values: FormChapterNameType,
    ): Promise<ChapterResponse> => {
      const res = await axios.post(`/api/course/${id}/chapter`, values);

      return res.data;
    },

    onSuccess: (result) => {
      if (result.success) {
        toast.success("Capítulo creado correctamente");

        queryClient.invalidateQueries({
          queryKey: ["course", id],
        });
        
      } else {
        toast.error(result.error || "Error al crear capítulo");
      }
     
    },
onError: (error: AxiosError<{ message?: string }>) => {
      
      console.error("[CHAPTER_CREATE_CLIENT]", error);
      
      const errorMessage = error.response?.data?.message || "Error del servidor";
      toast.error(errorMessage);
    },
  });
};


export const useCourseChapters=(id:string)=>{

  return useQuery<CourseResponse>({
    queryKey:["course",id],
    queryFn: async()=>{
      const res = await axios.get(`/api/course/${id}`);
      return res.data;
    }     
  })
}