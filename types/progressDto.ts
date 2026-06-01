export interface Progress {
  id: string;
  chapterId: string;
  userId: string;
  isCompleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

//dto para el frontend
export interface ProgressDTO {
  id: string;

  chapterId: string;
  userId: string;
  isCompleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}


export interface ProgressResponse {
  success: boolean;
  data: ProgressDTO | null;
  error?: string;
}
