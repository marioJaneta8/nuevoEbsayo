"use client";

import axios from "axios";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { ChapterResponse } from "@/types/chapterDto";

interface UseChapterVideoProps {
  chapterId: string;
  courseId: string;
}

type ChapterVideoPayload = {
  videoUrl?: string;
};

export const useChapterVideo = ({
  chapterId,
  courseId,
}: UseChapterVideoProps) => {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: async (
      values: ChapterVideoPayload
    ): Promise<ChapterResponse> => {
      const res =await axios.patch<ChapterResponse>(
          `/api/course/${courseId}/chapter/${chapterId}`,
          
           values,
          
        );

      return res.data;
    },

   onSuccess: (result) => {
      if (!result.success) {
        toast.error(result.error ?? "Error al actualizar el video");
        return;
      }

      toast.success("Video actualizado");

      // ✅ invalida el capítulo para que el video nuevo aparezca
      queryClient.invalidateQueries({
        queryKey: ["chapter", courseId, chapterId],
      });
    },

    onError: (error) => {
      console.error("[CHAPTER_VIDEO]", error);
      toast.error("Error del servidor");
    },
  });
};
