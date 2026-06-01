import {Chapter,UserProgress} from "@prisma/client";
import { ProgressDTO} from "../progressDto";

import {ChapterDTO } from "../chapterDto";
import { toChapterDTO } from "./chapter.mapper";



export function toProgressDto(progress: UserProgress): ProgressDTO {
  return {
    id: progress.id,
    chapterId: progress.chapterId,
    userId: progress.userId,
    isCompleted: progress.isCompleted ?? false,
    createdAt: progress.createdAt ?? new Date(),
    updatedAt: progress.updatedAt ?? new Date()
  };
}

export function toProgressDtoList(progressList: UserProgress[]): ProgressDTO[] {
  return progressList.map(toProgressDto);
}


export interface ChapterWithProgressDTO extends ChapterDTO {
  progress: ProgressDTO[];
}

export function toProgressWithChaptersDTO(chapter: Chapter &{ userProgress: UserProgress[] }): ChapterWithProgressDTO {
  return {
    ...toChapterDTO(chapter),
    progress: toProgressDtoList(chapter.userProgress || []),   
  };
}
