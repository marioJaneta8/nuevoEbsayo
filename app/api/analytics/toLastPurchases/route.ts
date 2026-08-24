import {getLastPurchases} from "@/actions/getLastPurchases";
import { NextResponse } from "next/server";


export async function GET(){
    try {
        const data = await getLastPurchases(10);
        return NextResponse.json({data}, {status:200}   )
    } catch (error) {
      console.error("[GET_LAST_PURCHASES_API]", error);

    return NextResponse.json(
      {
        error: "No se pudieron obtener las compras",
      },
      {
        status: 500,
      },
    )
    }
}