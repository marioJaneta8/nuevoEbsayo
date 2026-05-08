"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormChapterNameType, FormChapterNameShema } from "./form.Chapter.type";
import { useForm } from "react-hook-form";
import { useChapterBlock } from "./useChapterBlock";

import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FormChapterNameProps {
  setShowInputChapter: (value: boolean) => void;
  id: string;
}

export const FormChapterName = ({
  setShowInputChapter,
  id,
}: FormChapterNameProps) => {
  const form = useForm<FormChapterNameType>({
    resolver: zodResolver(FormChapterNameShema),
    defaultValues: {
      title: "",
    },
    mode: "onChange",
  });

  const { mutate, isPending } = useChapterBlock({ id });

  const onSubmit = (data: FormChapterNameType) => {
    mutate(data, {
      onSuccess: () => {
        form.reset(); 
        setShowInputChapter(false); 
      },
    });
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4 mb-4"
    >
      <Field data-invalid={!!form.formState.errors.title}>
        <FieldLabel>Título del Capítulo</FieldLabel>

        <Input
          {...form.register("title")}
          placeholder="Ej: Capítulo 1: Introducción a la Programación"
          type="text"
          aria-invalid={!!form.formState.errors.title}
        />

        {form.formState.errors.title && (
          <FieldError errors={[form.formState.errors.title]} />
        )}
      </Field>

      <Button
        type="submit"
        disabled={!form.formState.isValid || isPending}
        className="w-full"
      >
        {isPending ? "Creando..." : "Crear Capítulo"}
      </Button>
    </form>
  );
};