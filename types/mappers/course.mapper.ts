import { CourseDTO } from "@/types/course";
import { Course } from "@prisma/client";

const categoryMap: Record<string, string> = {
  FRONTEND: "Frontend",
  BACKEND: "Backend",
  FULLSTACK: "Fullstack",
  INFRAESTRUCTURA: "Infraestructura",
  DISEÑO_UX_UI: "Diseño UX/UI",
};

const levelMap: Record<string, string> = {
  PRINCIPIANTE: "Principiante",
  INTERMEDIO: "Intermedio",
  AVANZADO: "Avanzado",
};

export function toCourseDTO(course: Course): CourseDTO {
  return {
    id: course.id,
    title: course.title,
    slug: course.slug,
    price: course.price ?? 0,
    isPublished: course.isPublished ?? false,
    imageUrl: course.imageUrl ?? "/default-image.png",
    description: course.description ?? "",
    category: categoryMap[course.category ?? ""] ?? "Frontend",
    level: levelMap[course.level ?? ""] ?? "Principiante",
    createdAt: course.createdAt ?? new Date(),
    updatedAt: course.updatedAt ?? new Date(),
  };
}

export function toCoursesDTO(courses: Course[]): CourseDTO[] {
  return courses.map(toCourseDTO);
}