"use client";

import { Cog } from "lucide-react";
import { TitleBlock } from "../TitleBlock";
import { CourseDTO } from "@/types/course";
import { zodResolver } from "@hookform/resolvers/zod";

import { formCourseSchema, FormCourseType } from "./CouseFormType";
import { Controller, useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCourseForm } from "./useCourseForm";

interface CourseFormProps {
  course: CourseDTO;
}



export const CourseForm = ({ course }: CourseFormProps) => {

  const { mutateAsync, isPending } = useCourseForm({ id: course.id });
  const [loading, setLoading] = useState(false);

  const form = useForm<FormCourseType>({
    resolver: zodResolver(formCourseSchema),
    defaultValues: {
      title: course.title,
      description: course.description || "",
      slug: course.slug,
      category: course.category,
      level: course.level,
    },
  });

  const onSubmit = async (values: FormCourseType) => {
 
    const result = await mutateAsync(values);
    if(!result.success) {
      console.log("Error al actualizar el curso:", result.error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-md">
      <TitleBlock title="Configuracion" icon={Cog} />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Titulo Del Curso</FieldLabel>

                <Input
                  {...field}
                  placeholder="Curso de ReactJS"
                  type="text"
                  aria-invalid={fieldState.invalid}
                />
                <FieldDescription>
                  Esto es el titulo del curso, debe ser unico y no puede estar
                  vacio.
                </FieldDescription>

                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="slug"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Url del Curso</FieldLabel>

                <Input
                  {...field}
                  placeholder="Curso de ReactJS"
                  type="text"
                  aria-invalid={fieldState.invalid}
                  disabled={true}
                />
                <FieldDescription>
                  Es unica Y no Se Puede Modificar
                </FieldDescription>

                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="category"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Categoria</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoria Del Curso" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Frontend">Frontend</SelectItem>
                      <SelectItem value="Backend">Backend</SelectItem>
                      <SelectItem value="Fullstack">Fullstack</SelectItem>
                      <SelectItem value="Infraestructura">
                        Infraestructura
                      </SelectItem>
                      <SelectItem value="Diseño UX/UI">Diseño UX/UI</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="level"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Nivel Del Curso</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un nivel Del Curso" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Principiante">Principiante</SelectItem>
                      <SelectItem value="Intermedio">Intermedio</SelectItem>
                      <SelectItem value="Avanzado">Avanzado</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="description">Descripción</FieldLabel>

                <Textarea
                  id="description"
                  placeholder="Pon una descripción del curso."
                  className="resize-none"
                  {...field}
                />

                <FieldDescription>
                  Descripción completa del curso
                </FieldDescription>

                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </div>

        <Button 
        type="submit"
        disabled={isPending || loading}
        >
          Guardar Informacion Basica
        </Button>
        
      
      </form>
    </div>
  );
};
