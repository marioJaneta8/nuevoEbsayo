"use client";

import { Button } from "@/components/ui/button";
import { ChapterDTO } from "@/types/chapterDto";
import {
  ArrowLeft,
  Cog,
  Trash2Icon,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { TitleBlock } from "../../../components";
import {
  usePublishChapter,
  useDeleteChapter,
  useChapter,
} from "./useChapterForm";
import ChapterTitleForm from "../ChapterTitleForm/ChapterTitleForm";
import { ChapterVideoForm } from "../ChapterVideoForm";

interface ChapterFormProps {
  chapter: ChapterDTO;
  courseId: string;
}

const ChapterForm = ({
  chapter,
  courseId,
}: ChapterFormProps) => {
  const router = useRouter();

  const { mutate: togglePublish, isPending } =
    usePublishChapter({
      chapterId: chapter.id,
      courseId,
    });

  const {
    mutate: deleteChapter,
    isPending: isDeleting,
  } = useDeleteChapter({
    chapterId: chapter.id,
    courseId,
  });

  const { data: chapterData } = useChapter({
    chapterId: chapter.id,
    courseId,
  });

  const currentChapter =
    chapterData?.data ?? chapter;

  const onPublishCourse = () => {
    togglePublish({
      isPublished:
        !currentChapter.isPublished,

    });
  };

  const onRemoveChapter = () => {
    deleteChapter(undefined, {
      onSuccess: () => {
        router.replace(
          `/teacher/${courseId}`
        );
      },
    });
  };

  return (
    <div className="space-y-4">
      <Button
        variant="outline"
        onClick={() =>
          router.replace(
            `/teacher/${courseId}`
          )
        }
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver al curso
      </Button>

      <p className="text-sm text-muted-foreground">
        Estado del capítulo:{" "}
        <span className="font-medium">
          {currentChapter.isPublished
            ? "Publicado"
            : "Oculto"}
        </span>
      </p>

      <div className="p-6 mt-6 bg-white rounded-md flex justify-between items-center">
        <TitleBlock
          title="Configuración del capítulo"
          icon={Cog}
        />

        <div className="flex gap-3 items-center">
          <Button
            disabled={isPending}
            variant={
              currentChapter.isPublished
                ? "outline"
                : "default"
            }
            onClick={onPublishCourse}
          >
            {isPending && (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            )}

            {currentChapter.isPublished
              ? "Ocultar Capítulo"
              : "Publicar Capítulo"}
          </Button>

          <Button
            variant="destructive"
            disabled={
              isPending || isDeleting
            }
            onClick={onRemoveChapter}
          >
            {isDeleting && (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            )}

            <Trash2Icon className="w-4 h-4 mr-2" />
            Eliminar Capítulo
          </Button>
        </div>
      </div>

      <ChapterTitleForm
        chapter={currentChapter}
        courseId={courseId}
      />


      <ChapterVideoForm
       chapter={currentChapter}
       courseId={courseId}
       
      
      
      
      />
    </div>
  );
};

export default ChapterForm;