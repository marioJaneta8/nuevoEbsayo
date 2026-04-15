

export interface Chapter{

    id: string;
    title: string;
    slug: string;
    description: string;
    videoUrl: string;
    position: number;
    isPublished: boolean;
    isFree: boolean;
    createdAt: string;
    updatedAt: string;
  }

    export interface ChapterDTO{
    id: string;
    title: string;
    slug: string;
    description: string;
    videoUrl: string;
    position: number;
    isPublished: boolean;
    isFree: boolean;
    createdAt?: string;
    updatedAt?: string;
  }

  export interface ChapterResponse{
    success: boolean;
    data: ChapterDTO | null;
    error?: string;
  }