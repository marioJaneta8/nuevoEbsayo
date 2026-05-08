import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { CourseResponse } from "@/types/course";
import { toCourseWithChaptersDTO } from "@/types/mappers/chapter.mapper";
import {
  formCourseSchema,
  FormCourseType,
} from "@/app/(routes)/(root)/teacher/[id]/components/CourseForm/CouseFormType";

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

    
    if(!id || typeof id !== "string"){
      return NextResponse.json({ error: "Invalid course ID" }, { status: 400 });
    } 

  const result = await prisma.course.deleteMany({
      where: {
        id,
        userId,
       
      },
    }); 
    
    if(result.count === 0){
      return NextResponse.json({ error: "Course not found or unauthorized" }, { status: 404 });
    } 
  
   

    return NextResponse.json<CourseResponse>({
      success: true,
      data: null
    });
  } catch (error) {
    console.log("[COURSE_DELETE]", error);

    return new NextResponse("Internal error", { status: 500 });
  }
}

/// PATCH /api/course/:id
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

  
    const body: unknown = await request.json();

    // Validar que el body tenga la forma correcta
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: "Payload inválido",
        },
        { status: 400 },
      );
    }

// publicar y despublicar curso

    const { id } = await params;

   

    // =========================
    //  1. PUBLICAR CURSO
    // =========================
    if ("isPublished" in body) {
      const { isPublished } = body;

      if (typeof isPublished !== "boolean") {
        return NextResponse.json(
          { error: "Invalid isPublished value" },
          { status: 400 },
        );
      }



// Si quiere publicar, necesitamos validar el estado actual del curso
      if (isPublished) {
        
        const courseUser= await prisma.course.findUnique({
          where: { id, userId }, 
        })

        if (!courseUser) {
          return NextResponse.json(
            { error: "Course not found or unauthorized" },
            { status: 404 },
          );
        }

        const requiredFields = [
          courseUser.title,
          courseUser.slug,
          courseUser.description,
          courseUser.category,
          courseUser.level,
          courseUser.imageUrl,
          courseUser.price !== null 
        ];

        if (!requiredFields.every(Boolean)) {
          return NextResponse.json(
            { success: false, data: null, error: "Completa los datos antes de publicar" },
            { status: 400 },
          );
        } 
      }

      const updatedCourse = await prisma.course.update({
        where: { id, userId },
        data: { isPublished },
        include: { chapters: true },
      });

    

      return NextResponse.json({
        success: true,
        data: toCourseWithChaptersDTO(updatedCourse),
      });
    }

    // =========================
    //  2. ACTUALIZAR IMAGEN
    // =========================
    if ("imageUrl" in body) {
      const { imageUrl } = body;

      const updatedCourse = await prisma.course.update({
        where: { id, userId },
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

    if ("price" in body) {
      const { price } = body;
      if (typeof price !== "number" || price < 0) {
        return NextResponse.json(
          {
            success: false,
            data: null,
            error: "Precio inválido",
          },
          { status: 400 },
        );
      }
      const updatePriceCourse = await prisma.course.update({
        where: { id, userId },
        data: {
          price: price,
        },
        include: { chapters: true },
      });
      return NextResponse.json({
        success: true,
        data: toCourseWithChaptersDTO(updatePriceCourse),
      });
    }

    ////

    // =========================
    //  3. ACTUALIZAR FORM
    // =========================
    const parseResult = formCourseSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: "Datos inválidos",
        },
        { status: 400 },
      );
    }

    // Validar que el curso exista y sea del usuario antes de actualizar
    const currentCourse = await prisma.course.findUnique({
      where: { id, userId },
      select: { slug: true },
    });

    if (!currentCourse) {
      return NextResponse.json(
        { error: "Course not found or unauthorized" },
        { status: 404 },
      );
    }

    if (parseResult.data.slug !== currentCourse.slug) {
      return NextResponse.json(
        { success: false, data: null, error: "El slug no se puede modificar" },
        { status: 400 },
      );
    }

    const updatedCourse = await prisma.course.update({
      where: { id, userId },
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
        chapters: true,
      },
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

// POST /api/course/:id/chapter
