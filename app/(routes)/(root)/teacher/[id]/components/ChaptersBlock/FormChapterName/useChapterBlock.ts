"use client";

import axios, {
  AxiosError,
} from "axios";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { ChapterResponse } from "@/types/chapterDto";
import { FormChapterNameType } from "./form.Chapter.type";
import { CourseResponse } from "@/types/course";

interface UseChapterBlockProps {
  id: string;
}

export const useChapterBlock = ({
  id,
}: UseChapterBlockProps) => {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: async (
      values: FormChapterNameType
    ): Promise<ChapterResponse> => {

      const cachedCourse =
        queryClient.getQueryData<CourseResponse>(
          ["course", id]
        );

      const position =
        cachedCourse?.data?.chapters
          ?.length ?? 0;

      const res = await axios.post(
        `/api/course/${id}/chapter`,
        {
          ...values,
          position: position + 1,
        }
      );

      return res.data;
    },

    onSuccess: (result) => {
      if (!result.success) {
        toast.error(
          result.error ??
            "Error al crear capítulo"
        );
        return;
      }

      toast.success(
        "Capítulo creado correctamente"
      );

      queryClient.invalidateQueries({
        queryKey: ["course", id],
      });
    },

    onError: (
      error: AxiosError<{
        message?: string;
      }>
    ) => {
      console.error(
        "[CHAPTER_CREATE_CLIENT]",
        error
      );

      toast.error(
        error.response?.data
          ?.message ??
          "Error del servidor"
      );
    },
  });
};


export const useBulkUpdateChapters = (
  id: string
) => {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: async (
      data: {
        id: string;
        position: number;
      }[]
    ) => {
      const res =
        await axios.patch(
          `/api/course/${id}/chapter/reorder`,
          {
            list: data,
          }
        );

      return res.data;
    },

    onSuccess: () => {
      toast.success(
        "Orden actualizado"
      );

      queryClient.invalidateQueries({
        queryKey: ["course", id],
      });
    },

    onError: () => {
      toast.error(
        "Error al ordenar capítulos"
      );
    },
  });
};



export const useCourseChapters = (
  id: string
) => {
  return useQuery<CourseResponse>({
    queryKey: ["course", id],

    queryFn: async () => {
      const res = await axios.get(
        `/api/course/${id}`
      );

      return res.data;
    },

    staleTime: 1000 * 30,
  });
};