'use client'


import { ChapterDTO } from "@/types/chapterDto";
import { TitleBlock } from "../TitleBlock";
import { ListCheck, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FormChapterName, useCourseChapters } from "./FormChapterName";

interface ChapterBlockProps {
  id: string;
}



export const ChapterBlock = ({ id}: ChapterBlockProps) => {
  

  const{ data, isLoading, isError } = useCourseChapters(id);
  
  const  chapeterList = data?.data?.chapters || [];

  // Estado para manejar la carga de capítulos, útil para futuras implementaciones de edición o creación de capítulos
  const [showInputChapter, setShowInputChapter] = useState(false);

  return (
    <div className="p-6 bg-white rounded-md h-fit relative">

    <TitleBlock title='Capítulos Del Curso' icon={ListCheck}/>

    <div className="flex gap-2 items-center justify-between mb-3">
    <p>Capitulos Completos</p>
    <Button variant="outline" size="sm" onClick={()=>setShowInputChapter(true)}>
        <PlusCircle className="h-4 w-4" />
        Crear Capitulo
    </Button>
    </div>

    {showInputChapter && <FormChapterName
    
    setShowInputChapter={setShowInputChapter}
    id={id}
    
    />}



{chapeterList.map((chapter: ChapterDTO) => (
 <p key={chapter.id}  >{chapter.title}</p>
  
))}


    </div>
    )
    }

