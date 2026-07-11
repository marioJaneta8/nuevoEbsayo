import { Chapter, UserProgress } from "@prisma/client";
import { ProgressDTO } from "../progressDto";

import { ChapterDTO } from "../chapterDto";
import { toChapterDTO } from "./chapter.mapper";

export function toProgressDto(progress: UserProgress): ProgressDTO {
  return {
    id: progress.id,
    chapterId: progress.chapterId,
    userId: progress.userId,
    isCompleted: progress.isCompleted ?? false,
    createdAt: progress.createdAt ?? new Date(),
    updatedAt: progress.updatedAt ?? new Date(),
  };
}

//Mapper de una lista de progresos
export function toProgressDtoList(progressList: UserProgress[]): ProgressDTO[] {
  return progressList.map(toProgressDto);
}

// 2. Interfaz del Capítulo con su Progreso
export interface ChapterWithProgressDTO extends ChapterDTO {
  progress: ProgressDTO | null;
}

// 3. Mapper del Capítulo con Progreso // esta stanby por que tengo course con chapters
export function toChapterWithProgressDTO(
  chapter: Chapter & { userProgress: UserProgress[] },
): ChapterWithProgressDTO {
  return {
    ...toChapterDTO(chapter),
    progress:
      chapter.userProgress.length ? toProgressDto(chapter.userProgress[0]): null,
  };
}
export interface CourseProgressDTO {
  progressPercentage: number;
}
// Esta  es para actualizar un curso en general cuando se hace fetch de todos los cursos o cuando se actualiza un capitulo
export function toCourseProgressDTO(
  progressPercentage: number,
): CourseProgressDTO {
  return {
    progressPercentage,
  };
}
