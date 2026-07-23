import { ChapterDTO } from "@/types/chapterDto";
import { ProgressDTO } from "@/types/progressDto";
import { Eye, LockIcon } from "lucide-react";
import Link from "next/link";

interface ChapterLitsProps {
  chapters: ChapterDTO[];
  chapterCurrent: ChapterDTO;
  courseSlug: string;
  userProgress: ProgressDTO[];
}

const ChapterLits = ({
  chapters,
  chapterCurrent,
  courseSlug,
  userProgress,
}: ChapterLitsProps) => {
  if (!chapters) {
    return null;
  }

  return (
    <div className="grid gap-4">
      {chapters.map((chapter) => {

  const isComplete = userProgress.some(
    (progress)=>
        progress.chapterId === chapter.id &&
        progress.isCompleted
  )



        return (
          <Link
            href={`/courses/${courseSlug}/${chapter.id}`}
            key={chapter.id}
            className={`flex items-center justify-between border-gray-200 rounded-md transition-all duration-300
                
                ${chapter.id === chapterCurrent.id ? "bg-violet-400 text-white" : "hover:bg-violet-200 hover:shadow-lg"}
                
                
                `}
          >
            <div className="flex items-center gap-2 border shadow-md w-full justify-between rounded-md p-2">

               <span>{chapter.title}</span> 
                
                {isComplete ? (
                   <Eye className="h-4 w-4 shrink-0"/>
                ) : (

                  <LockIcon className="w-4 h-4 shrink-0"/>
                   
                
                )}
                
                
                
            </div>



          </Link>
        );
      })}
    </div>
  );
};

export default ChapterLits;
