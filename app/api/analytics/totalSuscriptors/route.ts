import {  NextResponse } from "next/server";
import {getSubscribersByMonth} from "@/actions/getSuscriptorsByMont"



export async function GET() {
  try {
    const data = await getSubscribersByMonth();

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("[GET_TOTAL_SUSCRIPTORS] Error:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
