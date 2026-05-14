import { prisma } from "@/lib/prisma";
import { ChapterResponse } from "@/types/chapterDto";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
// Endpoint para reordenar capítulos de un curso
interface ReorderItem {
  id: string;
  position: number;
}

// Validaciones para el payload de reordenamiento
const isValidPosition = (value: unknown): value is number =>
  typeof value === "number" && Number.isInteger(value) && value > 0;

// Validación de cada item del array de reordenamiento
const isValidReorderItem = (item: unknown): item is ReorderItem => {
  if (!item || typeof item !== "object") {
    return false;
  }

  // Validación de estructura y tipos
  const candidate = item as { id?: unknown; position?: unknown };
// Validación de campos requeridos y tipos
  return typeof candidate.id === "string" && isValidPosition(candidate.position);
};

// Handler para PATCH /api/course/[id]/chapter/reorder
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Validación inicial del payload
    const { id: courseId } = await params;
    const body = (await request.json()) as unknown;
// Validación inicial del payload
    if (!body || typeof body !== "object" || !("list" in body)) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: "Payload inválido",
        },
        { status: 400 },
      );
    }

    // Validación del payload
    const rawList = (body as { list: unknown }).list;

    if (!Array.isArray(rawList) || rawList.length === 0) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: "Payload inválido",
        },
        { status: 400 },
      );
    }

    if (!rawList.every(isValidReorderItem)) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: "Lista de orden inválida",
        },
        { status: 400 },
      );
    }

    const list: ReorderItem[] = rawList;

    const chapterIds = list.map((item) => item.id);
    const uniqueChapterIds = new Set(chapterIds);
    const uniquePositions = new Set(list.map((item) => item.position));

    if (
      uniqueChapterIds.size !== chapterIds.length ||
      uniquePositions.size !== list.length
    ) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: "Hay IDs o posiciones duplicadas",
        },
        { status: 400 },
      );
    }

    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
      select: { id: true },
    });

    if (!course) {
      return NextResponse.json(
        { error: "Course not found or unauthorized" },
        { status: 404 },
      );
    }

    const chapters = await prisma.chapter.findMany({
      where: {
        courseId,
        id: {
          in: chapterIds,
        },
      },
      select: { id: true },
    });

    if (chapters.length !== chapterIds.length) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: "Uno o más capítulos no pertenecen al curso",
        },
        { status: 400 },
      );
    }
// Reordenamiento de capítulos usando transacción para evitar conflictos de posición
    await prisma.$transaction(async (tx) => {
      for (const [index, item] of list.entries()) {

        await tx.chapter.update({
          where: { id: item.id },
          data: { position: -1 * (index + 1) },
        });
      }
// Segundo paso para evitar conflictos de posición
      for (const item of list) {
        await tx.chapter.update({
          where: { id: item.id },
          data: { position: item.position },
        });
      }
    });

    return NextResponse.json<ChapterResponse>({
      success: true,
      data: null,
    });
  } catch (error) {
    console.log("[CHAPTER_REORDER_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
