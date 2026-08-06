

import { prisma } from "@/lib/prisma";
import { toOrdersDTO } from "@/types/mappers/order.mapper";
import { OrderDTO } from "@/types/orderDto"

// se encarga de obtener las compras del usuario
export const getUserPurchases = async (
  userId: string,
): Promise<OrderDTO[]> => {
  try {
    const purchase = await prisma.purchase.findMany({
      where: {
        userId:userId
        },
      
      include: {
        course:true,
        payment:true

      }
       
    ,
      orderBy:{
        createdAt:"desc",
      },
    });
    return toOrdersDTO(purchase);
  } catch (error) {
    console.log("Error al obtener las compras", error);
    return [];
  }
};
