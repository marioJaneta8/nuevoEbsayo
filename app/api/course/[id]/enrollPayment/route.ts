import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PaymentStatus } from "@prisma/client";
import { toEnrollmentPaymentDTO } from "@/types/mappers/purchase.mapper";

//get api/course/:id/enrollPayment

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Invalid course ID" }, { status: 400 });
    }

    const course = await prisma.course.findUnique({
      where: { id },
    });

    if (!course) {
      return NextResponse.json(
        { error: "Course not found or unauthorized" },
        { status: 404 },
      );
    }

    const purchase = await prisma.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: userId,
          courseId: course.id,
        },
      },

      include: {
        payment: true,
      },
    });

    // SI NO EXISTE LA COMPRA AÚN: Buscamos el último estado de la tabla Payment 
// para avisarle al frontend si el Webhook falló o sigue PENDING.


if(!purchase){
  const lastPayment = await prisma.payment.findFirst({
    where:{
      userId,
      courseId:id,
    },
    orderBy:{
      createdAt:"desc"
    }
  })

  return NextResponse.json({
    success:true,
    data:{
      purchase:false,
      payment:lastPayment?.status??null,
    },
  })

}

   


    const data= toEnrollmentPaymentDTO(purchase)

    return NextResponse.json({
      success: true,
      data // Envía exactamente: { purchase: boolean, payment: PaymentStatus | null

    
  
    });
  } catch (error) {
    console.log("[ENROLL_PAYMENT_GET]", error);

    return new NextResponse("Internal error", { status: 500 });
  }
};
