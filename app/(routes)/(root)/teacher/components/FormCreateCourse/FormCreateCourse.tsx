"use client";
import { toast } from "sonner";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  formCreateCourseSchema,
  FormCreateCourseType,
} from "./FormCreateCourseType";
import axios from "axios";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { useRouter } from "next/navigation";

export const FormCreateCourse = () => {
  const router = useRouter();
  const form = useForm<FormCreateCourseType>({
    resolver: zodResolver(formCreateCourseSchema),
    defaultValues: {
      courseName: "",
      slug: "",
    },
  });

  const onSubmit = async (values: FormCreateCourseType) => {
    console.log(values);

    try {
    const res=   await axios.post("/api/course", values);

    console.log(res.data)
      toast.success("Curso creado con éxito");
      router.push(`/teacher/${res.data.data.id}`);
    } catch (error) {
      console.error("Error creating course:", error);
      toast.error("Error al crear el curso");
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
      <Controller
        name="courseName"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Nombre del Curso</FieldLabel>

            <Input
              {...field}
              placeholder="Curso de React"
              type="text"
              aria-invalid={fieldState.invalid}
            />

            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="slug"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Slug</FieldLabel>
            <Input
              {...field}
              placeholder="react-basics"
              type="text"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Button type="submit" className="w-full h-11 text-sm font-medium">
        Crear Curso
      </Button>
    </form>
  );
};
