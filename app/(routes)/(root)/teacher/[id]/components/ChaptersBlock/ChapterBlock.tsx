"use client";

import { useEffect, useState } from "react";
import { ChapterDTO } from "@/types/chapterDto";
import { TitleBlock } from "../TitleBlock";

import {
  GripVertical,
  ListCheck,
  Pencil,
  PlusCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  FormChapterName,
  useBulkUpdateChapters,
  useCourseChapters,
} from "./FormChapterName";

import {
  DragDropContext,
  Droppable,
  DropResult,
  Draggable,
} from "@hello-pangea/dnd";

interface ChapterBlockProps {
  id: string;
}

export const ChapterBlock = ({
  id,
}: ChapterBlockProps) => {
  const [showInputChapter, setShowInputChapter] =
    useState(false);
  const [orderedChapters, setOrderedChapters] =
    useState<ChapterDTO[]>([]);

  const {
    data,
    isLoading,
    isError,
  } = useCourseChapters(id);

  const { mutate: reorderChapters } =
    useBulkUpdateChapters(id);

  const chapterList =
    data?.data?.chapters ?? [];

  useEffect(() => {
    setOrderedChapters(chapterList);
  }, [chapterList]);

const onDragEnd = (
  result: DropResult
) => {
  if (!result.destination) return;

  if (
    result.source.index ===
    result.destination.index
  ) {
    return;
  }

  const items = [...orderedChapters];

  const [movedChapter] =
    items.splice(
      result.source.index,
      1
    );

  items.splice(
    result.destination.index,
    0,
    movedChapter
  );

  // actualización visual inmediata
  setOrderedChapters(items);

  // payload para backend
  const bulkUpdate = items.map(
    (chapter, index) => ({
      id: chapter.id,
      position: index + 1,
    })
  );

  reorderChapters(bulkUpdate);
};
  const onEditChapter = (
    chapterId: string
  ) => {
    console.log(
      "Editar capítulo:",
      chapterId
    );
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-white rounded-xl border shadow-sm">
        Cargando capítulos...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 bg-white rounded-xl border shadow-sm text-red-500">
        Error cargando capítulos
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl border shadow-sm space-y-4">
      <TitleBlock
        title="Capítulos Del Curso"
        icon={ListCheck}
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {orderedChapters.length} capítulos
        </p>

        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setShowInputChapter(true)
          }
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Crear Capítulo
        </Button>
      </div>

      {/* Formulario */}
      {showInputChapter && (
        <FormChapterName
          id={id}
          setShowInputChapter={
            setShowInputChapter
          }
        />
      )}

      {/* Lista */}
      <DragDropContext
        onDragEnd={onDragEnd}
      >
        <Droppable droppableId="chapters">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="space-y-3"
            >
              {orderedChapters.map(
                (
                  chapter: ChapterDTO,
                  index: number
                ) => (
                  <Draggable
                    key={chapter.id}
                    draggableId={chapter.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={
                          provided.innerRef
                        }
                        {...provided.draggableProps}
                        className="flex items-center justify-between rounded-xl border bg-slate-50 hover:bg-slate-100 transition p-4"
                      >
                        {/* Left */}
                        <div className="flex items-center gap-3">
                          <div
                            {...provided.dragHandleProps}
                            className="cursor-grab active:cursor-grabbing"
                          >
                            <GripVertical className="w-5 h-5 text-slate-400" />
                          </div>

                          <div>
                            <p className="font-medium">
                              {
                                chapter.title
                              }
                            </p>

                            <p className="text-xs text-muted-foreground">
                              Capítulo #
                              {index + 1}
                            </p>
                          </div>
                        </div>

                        {/* Right */}
                        <div className="flex items-center gap-3">
                          {chapter.isPublished ? (
                            <span className="text-xs bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full">
                              Publicado
                            </span>
                          ) : (
                            <span className="text-xs bg-red-100 text-red-500 px-3 py-1 rounded-full">
                              No publicado
                            </span>
                          )}

                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() =>
                              onEditChapter(
                                chapter.id
                              )
                            }
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                )
              )}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};