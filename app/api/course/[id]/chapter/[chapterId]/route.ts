import { chapterTitleSchema } from "@/app/(routes)/(root)/teacher/[id]/[chapterId]/components/ChapterTitleForm";
import { prisma } from "@/lib/prisma";
import { ChapterResponse } from "@/types/chapterDto";
import { toChapterDTO } from "@/types/mappers/chapter.mapper";
import { auth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";

import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
      chapterId: string;
    }>;
  },
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id, chapterId } = await params;

    const body = await request.json();
    console.log("BODY RECEIVED IN PATCH CHAPTER", body);

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: "Invalid request body",
        },
        {
          status: 404,
        },
      );
    }

    // valida que el chapter exista y pertenezca al curso y que el curso pertenezca al usuario

    const chapter = await prisma.chapter.findFirst({
      where: {
        id: chapterId,
        courseId: id,
        course: {
          userId,
        },
      },
      select: {
        id: true,
      },
    });

    if (!chapter) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: "Chapter not found",
        },
        {
          status: 404,
        },
      );
    }

    const dataToUpdate: Prisma.ChapterUpdateInput = {};

    // UPDATE FORM
    const hasFormFields =
      "title" in body || "description" in body || "isFree" in body;

    if (hasFormFields) {
      const parseResult = chapterTitleSchema.safeParse(body);

      if (!parseResult.success) {
        return NextResponse.json(
          {
            success: false,
            data: null,
            error: "Invalid form data",
          },
          { status: 400 },
        );
      }

      dataToUpdate.title = parseResult.data.title;

      dataToUpdate.description = parseResult.data.description;

      dataToUpdate.isFree = parseResult.data.isFree;
    }

    // UPDATE PUBLISH
    if (typeof body.isPublished === "boolean") {
      dataToUpdate.isPublished = body.isPublished;
    }

    // update VIDEO URL
    if ("videoUrl" in body) {
  if (
    typeof body.videoUrl !==
    "string"
  ) {
    return NextResponse.json(
      {
        success: false,
        data: null,
        error:
          "Invalid videoUrl",
      },
      { status: 400 }
    );
  }

 

  dataToUpdate.videoUrl =
    body.videoUrl;
}

    // lo que traga el body, validando que sea correcto, y actualizando solo esos campos, ya sea el form o el isPublished, o ambos, pero validando cada uno por separado y devolviendo errores específicos si alguno es inválido, y asegurando que al menos uno de los campos a actualizar esté presente en el body antes de hacer la actualización
    if (Object.keys(dataToUpdate).length === 0) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: "No valid fields to update",
        },
        { status: 400 },
      );
    }

    const updatedChapter = await prisma.chapter.update({
      where: {
        id: chapter.id,
      },
      data: dataToUpdate,
    });

    return NextResponse.json<ChapterResponse>(
      {
        success: true,
        data: toChapterDTO(updatedChapter),
        error: undefined,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("[CHAPTER_PATCH]", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}
// METODO DELETE

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
      chapterId: string;
    }>;
  },
) {
  try {
    const { userId } = await auth();
    const { id, chapterId } = await params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // valida:
    // - chapter existe
    // - pertenece al curso
    // - el curso pertenece al usuario

    const chapter = await prisma.chapter.findFirst({
      where: {
        id: chapterId,
        courseId: id,
        // relacion de uno a uno
        course: {
          userId: userId,
        },
      },
      // solo necesito el id de el chapter
      select: {
        id: true,
      },
    });

    if (!chapter) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: "Chapter not found or unauthorized",
        },
        {
          status: 404,
        },
      );
    }

    await prisma.chapter.delete({
      where: {
        id: chapter.id,
      },
    });

    return NextResponse.json<ChapterResponse>(
      {
        success: true,
        data: null,
        error: undefined,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log("[CHAPTER_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
