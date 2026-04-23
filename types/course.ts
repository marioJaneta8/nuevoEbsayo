// 🧱 Modelo interno (no se expone directo)
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
  createdAt: Date;
  updatedAt: Date;
}


type RequireFileds = "title" | "slug" ;
type OptionalFields = "id" | "price" | "imageUrl" | "description" | "level" | "createdAt" | "updatedAt";


// input para crear un curso
export type CourseBody =
  Pick<Course, RequireFileds> &
  Partial<Pick<Course, OptionalFields>>;


  //dto lo que sale del frontend para crear un curso

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

  export interface CourseResponse{
  success: boolean;
  data: CourseDTO | null;
  error?: string;
   
  }
