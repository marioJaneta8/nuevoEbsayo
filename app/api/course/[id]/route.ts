import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { CourseResponse } from "@/types/course";

import { CourseDTO } from "@/types/course";
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
    });

    return NextResponse.json<CourseResponse>({
      success: true,
      data: { id: course.id, title: course.title, slug: course.slug },
    });
  } catch (error) {
    console.log("[COURSE_DELETE]", error);

    return new NextResponse("Internal error", { status: 500 });
  }
}


export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> })
  {


    try{
      const { userId } = await auth();
      if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }


      const { id } = await params;
      const { isPublished} = await request.json();

  // validar el tipo de dato de isPublished

  if(typeof isPublished !== "boolean"){
    return NextResponse.json({ error: "Invalid isPublished value" }, { status: 400 });
  }



   // validad que el curso exista y que el usuario sea el propietario

    const courseUser = await prisma.course.findUnique({
      where:{
        id: id,
        userId: userId,
      }
    })

    if (!courseUser) {
      return NextResponse.json({ error: "Course not found or unauthorized" }, { status: 404 });
    }



    // update del estado de publicacion del curso, utilizando el valor de isPublished que recibo desde el cliente
    const updatedCourse = await prisma.course.update({
      where: {
        id: id,
        userId: userId,
      },
      data: {
        isPublished: isPublished,
      },
    });

    return NextResponse.json<CourseResponse>({
      success: true,
      data: { id: updatedCourse.id, title: updatedCourse.title, slug: updatedCourse.slug },
    });
  }catch (error) {
    console.log("[COURSE_PATCH]", error);

    return new NextResponse("Internal error", { status: 500 }); 
  }

  }