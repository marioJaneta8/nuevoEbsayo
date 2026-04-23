import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { CourseResponse } from "@/types/course";
import { toCourseWithChaptersDTO } from "@/types/mappers/chapter.mapper";
import { formCourseSchema, FormCourseType } from "@/app/(routes)/(root)/teacher/[id]/components/CourseForm/CouseFormType";
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const course = await prisma.course.delete({
      where: {
        id: id,
        userId: userId,
      },
      include: {
        chapters:true
      }
    });

    return NextResponse.json<CourseResponse>({
      success: true,
      data: toCourseWithChaptersDTO(course),
    });
  } catch (error) {
    console.log("[COURSE_DELETE]", error);

    return new NextResponse("Internal error", { status: 500 });
  }
}




/// PATCH /api/course/:id
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body: unknown = await request.json();

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: "Payload inválido",
        },
        { status: 400 }
      );
    }

    const courseUser = await prisma.course.findUnique({
      where: { id },
      include: { chapters: true },
    });

    if (!courseUser || courseUser.userId !== userId) {
      return NextResponse.json(
        { error: "Course not found or unauthorized" },
        { status: 404 }
      );
    }

    // =========================
    // ✅ 1. PUBLICAR CURSO
    // =========================
    if ("isPublished" in body) {
      const { isPublished } = body;

      if (typeof isPublished !== "boolean") {
        return NextResponse.json(
          { error: "Invalid isPublished value" },
          { status: 400 }
        );
      }

      if (isPublished) {
        const requiredFields = [
          courseUser.title,
          courseUser.slug,
          courseUser.description,
          courseUser.category,
          courseUser.level,
          courseUser.imageUrl,
        ];

        const isComplete = requiredFields.every(Boolean);

        if (!isComplete) {
          return NextResponse.json(
            {
              success: false,
              data: null,
              error: "Completa los datos antes de publicar",
            },
            { status: 400 }
          );
        }
      }

      const updatedCourse = await prisma.course.update({
        where: { id },
        data: { isPublished },
        include: { chapters: true },
      });

      return NextResponse.json({
        success: true,
        data: toCourseWithChaptersDTO(updatedCourse),
      });
    }

    // =========================
    // ✅ 2. ACTUALIZAR IMAGEN
    // =========================
    if ("imageUrl" in body) {
      const { imageUrl } = body;

      const updatedCourse = await prisma.course.update({
        where: { id },
        data: {
          imageUrl: imageUrl || null,
        },
        include: { chapters: true },
      });

      return NextResponse.json({
        success: true,
        data: toCourseWithChaptersDTO(updatedCourse),
      });
    }


    /// actualizar el precio del curso





    ////

    // =========================
    // ✅ 3. ACTUALIZAR FORM
    // =========================
    const parseResult = formCourseSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: "Datos inválidos",
        },
        { status: 400 }
      );
    }

    if (parseResult.data.slug !== courseUser.slug) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: "El slug no se puede modificar",
        },
        { status: 400 }
      );
    }

    const updatedCourse = await prisma.course.update({
      where: { id },
      data: {
        title: parseResult.data.title,
        description: parseResult.data.description || null,
        category: parseResult.data.category,
        level: parseResult.data.level,
      },
      include: { chapters: true },
    });

    return NextResponse.json({
      success: true,
      data: toCourseWithChaptersDTO(updatedCourse),
    });

  } catch (error) {
    console.log("[COURSE_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    } 
    const { id } = await params;

    const course = await prisma.course.findUnique({
      where: {
        id: id,
        userId: userId,
      },
      include: {
        chapters:true
      }
    }); 
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json<CourseResponse>({
      success: true,
      data: toCourseWithChaptersDTO(course),
    });
  } catch (error) {
    console.log("[COURSE_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  } 
}   
