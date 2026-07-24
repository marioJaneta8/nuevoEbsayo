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
    position: chapter.position ?? 0,
    isPublished: chapter.isPublished  ,
    isFree: chapter.isFree || false,
    createdAt: chapter.createdAt ?? new Date(),
    updatedAt: chapter.updatedAt ?? new Date(),
  };
}



//Mapper para convertir un array de Chapter a un array de ChapterDTO, ordenando los capítulos por su posición antes de mapearlos. Esto es útil para asegurarnos de que los capítulos se muestren en el orden correcto en el frontend, ya que la posición es un campo que indica el orden de los capítulos dentro de un curso. Al ordenar los capítulos por su posición antes de mapearlos, garantizamos que el frontend reciba los capítulos en el orden correcto, lo que facilita la presentación de la información al usuario.
export function toChaptersDTO(chapters: Chapter[]): ChapterDTO[] {
  return [...chapters]
    .sort((a, b) => a.position - b.position)
    .map(toChapterDTO);
}

// DTO para course con chapters
// Este DTO extiende el CourseDTO e incluye un array de ChapterDTO

// fronted lo usaremos para mostrar el curso con sus capítulos en la lista de cursos, así como en la página de detalles del curso. De esta forma, evitamos hacer múltiples llamadas a la API para obtener los capítulos de un curso, ya que vendrán incluidos en el mismo DTO.
export interface CourseWithChaptersDTO extends CourseDTO {
  chapters: ChapterDTO[];
}
//base datos para el curso con capítulos, que se usará en el backend para mapear los datos que vienen de la base de datos y enviarlos al frontend en el formato correcto. Este DTO se construirá a partir del Course y sus Chapters asociados, utilizando los mappers definidos anteriormente para convertir cada Chapter a ChapterDTO y el Course a CourseDTO.
// Mapper para convertir un Course con sus Chapters a CourseWithChaptersDTO
export function toCourseWithChaptersDTO(course: Course & { chapters: Chapter[] }): CourseWithChaptersDTO {
  return {
    ...toCourseDTO(course),
    chapters: toChaptersDTO(course.chapters || []),
  };
}
//chapter con posibilidad de incluir el progreso del usuario, que se usará en el backend para mapear los datos que vienen de la base de datos y enviarlos al frontend en el formato correcto. Este DTO se construirá a partir del Chapter y su progreso asociado, utilizando los mappers definidos anteriormente para convertir cada Chapter a ChapterDTO y el progreso a ProgressDTO.  


export interface CourseCardDTO extends CourseWithChaptersDTO{
  progressPercentage?: number;
  purchased?:boolean;
}

export function toCourseCardDTO(course: Course & { chapters: Chapter[] }, progressPercentage?: number,purchased?:boolean): CourseCardDTO {
  return {
    ...toCourseWithChaptersDTO(course),
    progressPercentage,
    purchased,
  };
}