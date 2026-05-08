
// Definición de tipos para Chapter y ChapterDTO
export interface Chapter {
  id: string;
  title: string;
  description?: string;
  videoUrl?: string;
  position: number;
  isPublished: boolean;
  isFree: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// DTO para el frontend, con campos opcionales y formateados para consumo del frontend
export interface ChapterDTO {
  id: string;
  title: string;
  description?: string;
  videoUrl?: string;
  position: number;
  isPublished: boolean;
  isFree: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Respuesta estándar para endpoints relacionados con chapters
export interface ChapterResponse {
  success: boolean;
  data: ChapterDTO | null;
  error?: string;
}