import { CourseDTO } from "@/types/course";
import { Course } from "@prisma/client";

// Mapper para convertir un Course (modelo de base de datos) a CourseDTO (modelo de API)
export function toCourseDTO(course: Course): CourseDTO {
  return {
    id: course.id,
    title: course.title,
    slug: course.slug,
    price: course.price || 0  ,
    isPublished: course.isPublished || false,
    imageUrl: course.imageUrl ||"/default-image.png",
    description: course.description || "",
    category: course.category || "Frontend" || "Backend" || "Fullstack" || "Infraestructura" || "Diseño UX/UI",
    level: course.level || "Principiante" || "Intermedio" || "Avanzado",
    createdAt: course.createdAt  ?? new Date().toISOString(),
    updatedAt: course.updatedAt   ?? new Date().toISOString(),
  };
}

// Mapper para listas
export function toCoursesDTO(courses: Course[]): CourseDTO[] {
  return courses.map(toCourseDTO);
}