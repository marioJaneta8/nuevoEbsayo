"use client";

import { useState } from "react";
import { Loader2, Pencil, Video } from "lucide-react";

import { ChapterDTO } from "@/types/chapterDto";
import { TitleBlock } from "../../../components";
import { Button } from "@/components/ui/button";
import { UploadButton } from "@/utils/uploadthing";

import { useChapterVideo } from "./useChapterVideo";
import { useChapter } from "../ChapterForn/useChapterForm";

interface ChapterVideoFormProps {
  chapter: ChapterDTO;
  courseId: string;
}

export const ChapterVideoForm = ({
  chapter,
  courseId,
}: ChapterVideoFormProps) => {
  // estados para manejar la selección y subida del video
  const [isSelecting, setIsSelecting] = useState(false);
  //   estado para manejar la subida del video, se activa cuando el usuario selecciona un video y se desactiva cuando la subida termina o falla
  const [isUploading, setIsUploading] = useState(false);

  const { mutate: updateVideo, isPending } = useChapterVideo({
    chapterId: chapter.id,
    courseId,
  });

  const { data: chapterData } = useChapter({
    chapterId: chapter.id,
    courseId,
  });

  const currentChapter = chapterData?.data ?? chapter;

  return (
    <div className="mt-6 rounded-md border bg-white p-6">
      <TitleBlock title="Añade o modifica video al capítulo" icon={Video} />

      {/* VIDEO */}
      <div className="mt-4">
        {currentChapter.videoUrl ? (
          <video
            src={currentChapter.videoUrl}
            controls
            className="w-full rounded-md max-h-125"
          />
        ) : (
          <p className="text-sm text-muted-foreground">
            No hay video asociado a este capítulo.
          </p>
        )}
      </div>

      {/* SUBIDA */}
      <div className="mt-4 rounded-md border p-4">
        {!isSelecting ? (
          <Button
            variant="secondary"
            onClick={() => setIsSelecting(true)}
            disabled={isPending}
          >
            <Pencil className="mr-2 h-4 w-4" />
            {currentChapter.videoUrl ? "Modificar video" : "Subir video"}
          </Button>
        ) : (
          <UploadButton
            endpoint="chapterVideo"
            onUploadBegin={() => {
              setIsUploading(true);
            }}
            onClientUploadComplete={(res) => {
              if (!res?.[0]) {
                setIsSelecting(false);
                setIsUploading(false);
                return;
              }

              const uploadedUrl = res[0].serverData.url;

              updateVideo(
                {
                  videoUrl: uploadedUrl,
                },
                {
                  onSettled: () => {
                    setIsUploading(false);
                    setIsSelecting(false);
                  },
                },
              );
            }}
            onUploadError={(error) => {
              console.error("[UPLOAD_VIDEO]", error);

              setIsUploading(false);
              setIsSelecting(false);
            }}
          />
        )}

        {/* Estado esperando selección */}
        {isSelecting && !isUploading && !isPending && (
          <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Esperando que selecciones un archivo...
          </div>
        )}

        {/* Estado subiendo */}
        {(isUploading || isPending) && (
          <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Subiendo video...
          </div>
        )}
      </div>
    </div>
  );
};
