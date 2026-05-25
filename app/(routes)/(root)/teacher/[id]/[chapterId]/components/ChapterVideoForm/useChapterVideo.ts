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

    onSuccess: async ( result,variable) => {
      if (!result.success || !result.data) {
        toast.error(result.error ?? "Error al subir el video");
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

      //toastSubir el video
      if (variable.videoUrl) {
        toast.success("Video subido/modificado");
      } else {
        toast.success("Video eliminado");
      }
    },
    onError: (error) => {
        console.log("[CHAPTER_VIDEO]", error);
        toast.error("Error al subir el video");
      }

    

  });
};