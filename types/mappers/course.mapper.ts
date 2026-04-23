import { CourseDTO } from "@/types/course";

// Mapper base
export function toCourseDTO(course:any): CourseDTO {
  return {
    id: course.id,
    title: course.title,
    slug: course.slug,
    price: course.price || 0  ,
    isPublished: course.isPublished,
    imageUrl: course.imageUrl ||"/default-image.png",
    description: course.description || "",
    category: course.category || "Frontend" || "Backend" || "Fullstack" || "Infraestructura" || "Diseño UX/UI",
    level: course.level || "Principiante" || "Intermedio" || "Avanzado",
    createdAt: course.createdAt   ?? new Date(),
    updatedAt: course.updatedAt   ?? new Date(),
  };
}

// Mapper para listas
export function toCoursesDTO(courses: any[]): CourseDTO[] {
  return courses.map(toCourseDTO);
}