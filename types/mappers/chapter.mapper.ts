import { ChapterDTO } from "../chapterDto";
import { CourseDTO } from "../course";
import { toCourseDTO } from "./course.mapper";

export function toChapterDTO(chapter: any): ChapterDTO {
  return {
    id: chapter.id,
    title: chapter.title,
    slug: chapter.slug,
    description: chapter.description || "",
    videoUrl: chapter.videoUrl || "",
    position: chapter.position || 0,
    isPublished: chapter.isPublished || false,
    isFree: chapter.isFree || false,
    createdAt: chapter.createdAt?.toISOString() ?? new Date().toISOString(),
    updatedAt: chapter.updatedAt?.toISOString() ?? new Date().toISOString(),
  };
}

// Mapper para listas chapters
export function toChaptersDTO(chapters: any[]): ChapterDTO[] {
  return chapters.map(toChapterDTO);
}

// Mapper para course con chapters
// aqui se mapea el course con sus chapters, utilizando el mapper de course y el mapper de chapters para mapear cada uno de los chapters del course
export interface CourseWithChaptersDTO extends CourseDTO {
  chapters: ChapterDTO[];
}

// Mapper para course con chapters

// aqui se mapea el course con sus chapters, utilizando el mapper de course y el mapper de chapters para mapear cada uno de los chapters del course
export function toCourseWithChaptersDTO(course: any): CourseWithChaptersDTO {
  return {
    ...toCourseDTO(course),
    chapters: toChaptersDTO(course.chapters || []),
  };
}
