import { z } from "zod";


export const FormChapterNameShema= z.object({
title: z.string().min(2).max(255, "Chapter name must be less than 255 characters"),       
    
})

export type FormChapterNameType = z.infer<typeof FormChapterNameShema>