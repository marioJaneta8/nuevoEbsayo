import { ChapterDTO} from "@/types/chapterDto";
import { ProgressDTO } from "@/types/progressDto";
import ChapterLits from "./chapteLists/ChapterLits";

interface ChapterCourseProps {

    chapters: ChapterDTO[]; // array de capítulos
    chapterCurrent:ChapterDTO; // capítulo actual
    courseSlug:string; // slug del curso
    userProgress: ProgressDTO[]; // progreso del usuario

}
  




export const ChapterCourse = ({
    chapters,
    chapterCurrent,
    courseSlug,
    userProgress
}:ChapterCourseProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200  h-fit ">

     <h2 className="text-2xl font-semibold text-gray-800 mb-4">Capitulos</h2>
     <ChapterLits
     chapters={chapters}
     chapterCurrent={chapterCurrent}
     courseSlug={courseSlug}
     userProgress={userProgress}
     />
    </div>
  ) 
}

