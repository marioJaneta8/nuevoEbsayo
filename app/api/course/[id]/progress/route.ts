import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getUserProgress } from "@/actions/getUserProgress";
import { ProgressResponseList } from "@/types/progressDto";


export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const progress = await getUserProgress(id);

    

    return NextResponse.json<ProgressResponseList>({
    success: true,
      data: progress,
    });
  } catch (error) {
    console.error("[GET_PROGRESS]", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}