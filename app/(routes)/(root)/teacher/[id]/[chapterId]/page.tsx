// server component para cargar el curso y pasar el dto a los componentes cliente
import {prisma} from "@/lib/prisma";
import {auth} from "@clerk/nextjs/server";
import ChapterForm from "./components/ChapterForn/ChapterForm";
import {CourseWithChaptersDTO, toChapterDTO} from "@/types/mappers/chapter.mapper";
import {ChapterDTO} from "@/types/chapterDto";

interface ChaperPageProps {
    params: Promise < {
        id: string;
        chapterId: string
    } >;
}

export default async function ChapterPage({params} : ChaperPageProps) {
    const {id, chapterId} = await params;
    const {userId} = await auth();

    if (!userId) {
        return (
            <div className="p-6">
                <h1 className="text-xl font-semibold">Acceso denegado</h1>
            </div>
        );
    }
    // valdiar que el usuario sea el dueño del curso
    // Validación de existencia del curso y pertenencia al usuario
    const chapter = await prisma.chapter.findUnique({
        where: {
            id: chapterId,
        },
        include: {
            course: {
                select: {
                    userId: true
                }
            }
        }
    });


    if (!chapter || chapter.course.userId !== userId) {
        return <p className="text-red-500">Este capítulo no existe.</p>;
    }


    // tipado del curso completo con chapters
    const chapterDto = toChapterDTO(chapter);



    return <div className="m-6">

        <ChapterForm
            courseId={id}
            chapter={chapterDto}
        />


    </div>;
}
