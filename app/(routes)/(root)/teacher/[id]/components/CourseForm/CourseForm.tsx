import { Cog } from "lucide-react"
import{ TitleBlock } from "../TitleBlock"
import { CourseDTO } from "@/types/course";


interface CourseFormProps {
    course: CourseDTO;
}

// type courseWithChapters = CourseDTO & { chapters: ChapterDTO[] };

export const CourseForm = ({ course }: CourseFormProps) => {
  return (
    <div className="p-6 bg-white rounded-md">
    
    <TitleBlock
     title="Configuracion"
     icon= {Cog}
    
    />

    </div>
  )
}
