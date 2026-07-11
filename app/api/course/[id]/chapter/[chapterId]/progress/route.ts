import { NextResponse } from "next/server";
import { getMarkChapterAsCompleted } from "@/actions/getMarkChapterAsCompleted";
import { auth } from "@clerk/nextjs/server";

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
      chapterId: string;
    }>;
  }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const { chapterId } = await params;

    const progress = await getMarkChapterAsCompleted(chapterId);

    if (!progress) {
      return NextResponse.json(
        {
          success: false,
          error: "No se pudo actualizar el progreso",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: progress,
    });
  } catch (error) {
    console.error("[PATCH_PROGRESS]", error);

    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}