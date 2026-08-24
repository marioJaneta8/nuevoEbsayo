import { Payments, SuscriptorChart, TotalRenevue } from "./components";
import { auth } from "@clerk/nextjs/server";
export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
  
  const {userId} = await auth()
  
  if (!userId) {
    return <p>No autorizado</p>;
  }

  


    return (
    
    <div className="p-6">
    
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <SuscriptorChart />
        <TotalRenevue />
      </div>

      <Payments />
    </div>
  );
}
