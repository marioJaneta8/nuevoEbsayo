import { Payments, SuscriptorChart, TotalRenevue } from "./components";


export default function AnalyticsPage() {
    return (
        <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <SuscriptorChart/>
                <TotalRenevue/>
            </div>
            
            <Payments
            

            
            />
        </div>
    ) 
}
