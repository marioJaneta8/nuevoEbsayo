import { ChapterDTO } from "../chapterDto";
import { CourseDTO } from "../course";
import { toCourseDTO } from "./course.mapper";
import { Course,Chapter } from "@prisma/client";

export function toChapterDTO(chapter: Chapter): ChapterDTO {
  return {
    id: chapter.id,
    title: chapter.title,
    description: chapter.description || "",
    videoUrl: chapter.videoUrl || "",
    position: chapter.position || 0,
    isPublished: chapter.isPublished || false,
    isFree: chapter.isFree || false,
    createdAt: chapter.createdAt ?? new Date(),
    updatedAt: chapter.updatedAt ?? new Date(),
  };
}



// Mapper para listas chapters
export function toChaptersDTO(chapters: Chapter[]): ChapterDTO[] {
  return [...chapters]
    .sort((a, b) => a.position - b.position)
    .map(toChapterDTO);
}

// DTO para course con chapters
// Este DTO extiende el CourseDTO e incluye un array de ChapterDTO
export interface CourseWithChaptersDTO extends CourseDTO {
  chapters: ChapterDTO[];
}

// Mapper para convertir un Course con sus Chapters a CourseWithChaptersDTO
export function toCourseWithChaptersDTO(course: Course & { chapters: Chapter[] }): CourseWithChaptersDTO {
  return {
    ...toCourseDTO(course),
    chapters: toChaptersDTO(course.chapters || []),
  };
}
