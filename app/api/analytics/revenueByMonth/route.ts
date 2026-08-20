import {getRevenueByMonth} from "@/actions/getRevenueByMonth";
import { NextResponse } from "next/server";


export async function GET(){
    try{
        
    const data = await getRevenueByMonth();
    return NextResponse.json(data,{status:200});
    }
    catch(error){
        console.log(error);
        return NextResponse.json({error:"Error al obtener los datos"},{status:500});
    }
}
