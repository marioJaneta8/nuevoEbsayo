import {z} from 'zod';

export const formCreateCourseSchema = z.object({

    courseName: z.string().min(2).max(150).trim(),
     slug: z.string().min(2).max(150).trim(),


});

export type FormCreateCourseType = z.infer<typeof formCreateCourseSchema>;