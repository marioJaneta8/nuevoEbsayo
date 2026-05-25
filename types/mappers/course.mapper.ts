import { CourseDTO } from "@/types/course";
import { Course } from "@prisma/client";

// Mapper para convertir un Course (modelo de base de datos) a CourseDTO (modelo de API)
export function toCourseDTO(course: Course): CourseDTO {
  return {
    id: course.id,
    title: course.title,
    slug: course.slug,
    price: course.price ?? 0,
    isPublished: course.isPublished ?? false,
    imageUrl: course.imageUrl ?? "/default-image.png",
    description: course.description ?? "",
    category: course.category ?? "Frontend" ,
    level: course.level ?? "Principiante",
    createdAt: course.createdAt ?? new Date(),
    updatedAt: course.updatedAt ?? new Date()
  };
}

// Mapper para listas
export function toCoursesDTO(courses: Course[]): CourseDTO[] {
  return courses.map(toCourseDTO);
}