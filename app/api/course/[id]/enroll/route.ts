

import {prisma} from  "@/lib/prisma";
import { ChapterResponse } from "@/types/chapterDto";
import { toPurchaseDTO, toPurchasesDTO } from "@/types/mappers/purchase.mapper";
import { PurchaseDTO, PurchaseResponse, PurchaseStatusResponse } from "@/types/purchaseDto";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function POST (req:Request, {params}:{params:Promise<{id:string}>}){
 try {

    const {userId} = await  auth();

    if(!userId){
      return NextResponse.json({error:"Usuario no autenticado"}, {status:401})
    }

    const{id} = await params;


    // Verificar si el curso existe y esta publicado
    const existingCourse = await prisma.course.findUnique({
      where:{
        id,
       
      }
    });

    if(!existingCourse){
      return NextResponse.json({error:"Curso no encontrado o no publicado"}, {status:404})
    }

    // Verificar si el usuario ya esta inscrito en el curso
    const existingPurchase = await prisma.purchase.findUnique({
      where:{
        userId_courseId:{
          userId,
          courseId:id
        }

      }
    });

    if(existingPurchase){
      return NextResponse.json({error:"Usuario ya inscrito en el curso"}, {status:400})
    }

    //Crear la compra
    const purchase = await prisma.purchase.create({

  
      data:{
        userId,
        courseId:id,
        price:0
        
      }
    })

    return NextResponse.json<PurchaseResponse>({
      success:true,
      data:toPurchaseDTO(purchase),
      
      
      
    }, {
        
        status:201
    }
)
  
}catch(error){
  return NextResponse.json<PurchaseResponse>({
    success:false,
    data:null,
    error:"Error al inscribirse en el curso"
  }, {status:500})
}
}

//get purchase
export async function GET (req:Request, {params}:{params:Promise<{id:string}>}){
  try {

    const {userId} = await auth();

    if(!userId){
    
      return NextResponse.json({
        success:true,
        data:{
          purchased:false
        }
      },{
        status:200
      })
    }

    const{id} = await params;


    // Verificar si el usuario esta inscrito en el curso
   const purchased = await prisma.purchase.findUnique({
    where:{
      userId_courseId:{
        userId,
        courseId:id
      }
    }
   })

  

   return NextResponse.json<PurchaseStatusResponse>({
    success:true,
    data:{
      purchased:!!purchased
    }
   }, {
    status:200
   })
    
  }catch(error){
    return NextResponse.json({
      success:false,
      data:null,
      error:"Error al obtener la compra"
    }, {status:500})
  }
}