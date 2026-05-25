import {FormChapterNameShema} from "@/app/(routes)/(root)/teacher/[id]/components/ChaptersBlock/FormChapterName";
import {prisma} from "@/lib/prisma";
import {ChapterResponse} from "@/types/chapterDto";
import {toChapterDTO} from "@/types/mappers/chapter.mapper";
import {auth} from "@clerk/nextjs/server";
import {NextResponse} from "next/server";

export async function POST(request : Request, {
    params
} : {
    params : Promise < {
        id: string
    } >
},) {
    try {
        const {userId} = await auth();
        const {id} = await params;


        if (!userId) {
            return NextResponse.json({
                error: "Unauthorized"
            }, {status: 401});
        }

        // Verificar que el curso existe y pertenece al usuario
        const course = await prisma.course.findUnique({
            where: {
                id,
                userId
            }
        });


        if (! course) {
            return NextResponse.json({
                error: "Course not found"
            }, {status: 404});
        }


        // valido Datos

        const body: unknown = await request.json();
        // Log para depuración
        const parseResult = FormChapterNameShema.safeParse(body);

        if (! parseResult.success) {
            return NextResponse.json({
                success: false,
                data: null,
                error: "Datos inválidos"
            }, {
                status: 400
            },);
        }

        // si se borran los capítulos, se crean con la posición correcta, si no se borran, se crean al final de la lista

        const lastChapter = await prisma.chapter.findFirst({
            where: {
                courseId: id
            },
            orderBy: {
                position: "desc"
            },
            select: {
                position: true
            }
        });

        const newPosition = lastChapter ? lastChapter.position + 1 : 1;


        // crear el title con la position

        const NewChapter = await prisma.chapter.create({
            data: {
                title: parseResult.data.title,
                courseId: id,
                position: newPosition
            }
        });

        return NextResponse.json<ChapterResponse>({success: true, data: toChapterDTO(NewChapter)});
    } catch (error) {
        console.log("[CHAPTER_POST]", error);
        return new NextResponse("Internal error", {status: 500});
    }
}


export async function DELETE(request : Request, {
    params
} : {
    params : Promise < {
        id: string;
        chapterId: string;
    } >;
}) {
    try {
        const {userId} = await auth();

        if (!userId) {
            return NextResponse.json({
                success: false,
                error: "Unauthorized"
            }, {status: 401});
        }

        const {id: courseId, chapterId} = await params;

        // valida:
        // - chapter existe
        // - pertenece al curso
        // - el curso pertenece al usuario
        const chapter = await prisma.chapter.findFirst({
            where: {
                id: chapterId,
                courseId,
                course: {
                    userId
                }
            }
        });

        if (! chapter) {
            return NextResponse.json({
                success: false,
                error: "Chapter not found or unauthorized"
            }, {status: 404});
        }

        await prisma.chapter.delete({
            where: {
                id: chapter.id
            }
        });

        return NextResponse.json<ChapterResponse>({success: true, data: toChapterDTO(chapter),
error: undefined
        }, {
            status: 200
        });
    } catch (error) {
        console.log("[CHAPTER_DELETE]", error);

        return new NextResponse("Internal error", {status: 500});
    }
}
