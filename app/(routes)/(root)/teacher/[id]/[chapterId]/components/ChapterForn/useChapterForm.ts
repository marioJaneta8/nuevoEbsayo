"use client";

import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ChapterResponse } from "@/types/chapterDto";

interface UseChapterFormProps {
  chapterId: string;
  courseId: string;
}

type ChapterPayload = {
  title?: string;
  description?: string;
  isFree?: boolean;
  isPublished?: boolean;
};

export const usePublishChapter = ({
  chapterId,
  courseId,
}: UseChapterFormProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: ChapterPayload): Promise<ChapterResponse> => {
      const res = await axios.patch<ChapterResponse>(
        `/api/course/${courseId}/chapter/${chapterId}`,
        values,
      );

      return res.data;
    },

    onSuccess: async (result,variables) => {
      if (!result.success || !result.data) {
        toast.error(result.error ?? "Error al cambiar estado");
        return;
      }

      // actualiza cache local
      queryClient.setQueryData(
        ["chapter", courseId, chapterId],
        (oldData: ChapterResponse | undefined) => {
          return {
            ...oldData,
            success: true,
            data: result.data,
            error: undefined,
          };
        },
      );

      // TOASTS
      if (typeof variables.isPublished === "boolean") {
        toast.success(
          variables.isPublished ? "Capítulo publicado" : "Capítulo oculto",
        );
      } else {
        toast.success("Formulario actualizado");
      }
    },

    onError: (error) => {
      console.error("[CHAPTER_PUBLISH]", error);

      toast.error("Error al cambiar estado");
    },
  });
};
export const useDeleteChapter = ({
  chapterId,
  courseId,
}: UseChapterFormProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (): Promise<ChapterResponse> => {
      const res = await axios.delete<ChapterResponse>(
        `/api/course/${courseId}/chapter/${chapterId}`,
      );

      return res.data;
    },

    onSuccess: async (result) => {
      if (!result.success) {
        toast.error(result.error ?? "Error al eliminar el capítulo");

        return;
      }

      toast.success("Capítulo eliminado");

      // refresca lista del curso
      await queryClient.invalidateQueries({
        queryKey: ["course", courseId],
      });

      // elimina cache del capítulo
      queryClient.removeQueries({
        queryKey: ["chapter", courseId, chapterId],
      });
    },

    onError: (error) => {
      console.error("[CHAPTER_DELETE]", error);

      toast.error("Error al eliminar el capítulo");
    },
  });
};

// HOOK GET

export const useChapter = ({ chapterId, courseId }: UseChapterFormProps) => {
  return useQuery({
    queryKey: ["chapter", courseId, chapterId],

    queryFn: async (): Promise<ChapterResponse> => {
      const res = await axios.get<ChapterResponse>(
        `/api/course/${courseId}/chapter/${chapterId}`,
      );

      return res.data;
    },
    // solo se ejecuta si chapterId y courseId existen
    enabled: !!chapterId && !!courseId,
    // cada 30 segundos se vuelve a ejecutar
    staleTime: 1000 * 30,
  });
};
