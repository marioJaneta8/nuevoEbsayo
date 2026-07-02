"use client";

import { ChapterDTO } from "@/types/chapterDto";
import { zodResolver } from "@hookform/resolvers/zod";
import { chapterTitleSchema, ChapterTitleType } from "./chapter.type";

import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";


import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";

import { Checkbox } from "@/components/ui/checkbox";

import {useChapter, usePublishChapter} from "@/app/(routes)/(root)/teacher/[id]/[chapterId]/components/ChapterForn/useChapterForm";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const EditorDescription = dynamic(
  () => import("@/components/Shared/EditorDescription/EditorDescription"),
  { ssr: false,

     loading: () => (
      <div className="h-24 rounded-md border bg-slate-100 animate-pulse" />
    ),
   }
);

interface ChapterTitleFormProps {
  chapter: ChapterDTO;
  courseId: string;
}

const ChapterTitleForm = ({ chapter,courseId }: ChapterTitleFormProps) => {
  const form = useForm<ChapterTitleType>({
    resolver: zodResolver(chapterTitleSchema),

    defaultValues: {
      title: chapter.title || "",
      description: chapter.description || "",
      isFree: chapter.isFree || false,
    },
  });

 const {mutate: publishChapter, isPending:isPendingPublishChapter}= usePublishChapter({chapterId: chapter.id,courseId});

 const {data:chapterData}= useChapter({chapterId: chapter.id,courseId});


useEffect(() => {
if (chapterData?.data) {
  form.reset({
    title: chapterData.data.title,
    description: chapterData.data.description,
    isFree: chapterData.data.isFree,
  });
}
}, [chapterData, form]);



  const onSubmit = async (values: ChapterTitleType) => {
  publishChapter({
  title:
    values.title,
  description:
    values.description,
  isFree:
    values.isFree ?? false,
  
});
    
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 rounded-xl border bg-white p-6 shadow-sm"
      >
        {/* Título */}
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Nombre del capítulo</FieldLabel>

              <Input
                {...field}
                placeholder="Ej: Introducción a React"
                type="text"
                aria-invalid={fieldState.invalid}
              />

              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Descripción */}
        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Descripción del capítulo</FieldLabel>

              <EditorDescription
                value={field.value}
                onChange={field.onChange}
              />

              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Gratis */}
        <Controller
          name="isFree"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-start gap-3 rounded-lg border p-4">
                <Checkbox
                  id="isFree"
                  checked={!!field.value}
                  onCheckedChange={(checked) => field.onChange(checked)}
                />

                <FieldContent>
                  <FieldLabel htmlFor="isFree">Curso gratuito</FieldLabel>

                  <FieldDescription>
                    Activa esta opción si este capítulo será gratis para los
                    usuarios.
                  </FieldDescription>
                </FieldContent>
              </div>

              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Botón */}
        <div className="flex justify-end">
          <Button type="submit" disabled={isPendingPublishChapter} className="w-full md:w-auto">
            {isPendingPublishChapter ? <Loader2 className="w-4 h-4" /> : "Guardar Información"}
          </Button>
        </div>
      </form>

      {/* Columna derecha opcional */}
      <div className="hidden lg:block rounded-xl border bg-slate-50 p-6">
        <h3 className="font-semibold text-lg">Vista previa</h3>

        <p className="text-sm text-muted-foreground mt-2">
          Aquí puedes agregar contenido adicional, preview del capítulo o
          futuras configuraciones.
        </p>
      </div>
    </div>
  );
};

export default ChapterTitleForm;
