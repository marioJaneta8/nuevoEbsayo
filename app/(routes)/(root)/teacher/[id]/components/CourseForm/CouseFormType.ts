import { z } from "zod";

export const formCourseSchema = z.object({
  title: z.string().min(2).max(150).trim(),
  description: z.string().min(2).max(500).trim().optional().or(z.literal("")), // el campo
  slug: z.string().min(2).max(150).trim(),
  category: z.string().min(2).max(150).trim(),
  level: z.string().min(2).max(150).trim(),
});

export type FormCourseType = z.infer<typeof formCourseSchema>;
