import { CourseWithChaptersDTO } from "./mappers/chapter.mapper";

// 🧱 Modelo de datos para un curso
export interface Course {
  id: string;
  title: string;
  slug: string;
  price?: number;
  imageUrl?: string;
  description?: string;
  userId: string;
  isPublished: boolean;
  level?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
// 🧱 DTO (Data Transfer Object) para la API
export interface CourseDTO {
  id: string;
  title: string;
  slug: string;
  price?: number;
  isPublished?: boolean;
  imageUrl?: string;
  description?: string;
  category?: string;
  level?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
// 🧱 Respuesta de la API para un curso
export interface CourseResponse {
  success: boolean;
  data: CourseWithChaptersDTO | null;
  error?: string;
}
