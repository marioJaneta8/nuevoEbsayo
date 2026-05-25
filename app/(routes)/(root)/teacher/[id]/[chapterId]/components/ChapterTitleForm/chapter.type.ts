import z from "zod";


export const chapterTitleSchema = z.object({
    title: z.string().min(1, "El titulo es requerido").max(100, "El titulo debe tener al menos 100 caracteres"),
    description: z.string().min(1, "La descripcion es requerida").max(500, "La descripcion debe tener al menos 500 caracteres"),
    isFree: z.boolean().default(false).optional(),

})

export type ChapterTitleType = z.infer<typeof chapterTitleSchema>;