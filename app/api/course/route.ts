import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { CourseResponse } from "@/types/course";
import { formCreateCourseSchema } from "@/app/(routes)/(root)/teacher/components/FormCreateCourse/FormCreateCourseType";

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const parseResult = formCreateCourseSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 },
      );
    }
    const course = await prisma.course.create({
      data: {
        userId,
        title: parseResult.data.courseName,
        slug: parseResult.data.slug,
      },
    });

    console.log("[COURSE_POST]", course);

    return NextResponse.json<CourseResponse>({
      success: true,
      data: { id: course.id, title: course.title, slug: course.slug },
    });
  } catch (error) {
    console.log("[COURSE_POST]", error);

    return new NextResponse("Internal error", { status: 500 });
  }
}



