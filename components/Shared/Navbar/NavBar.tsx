import { SidebarTrigger } from "@/components/ui/sidebar";


export function NavBar() {
  return (
    <div className="flex justify-center p-4  border-b bg-white h-16 ">
  {/* es para desplegar el sdibar en pantallas pequeñas */}
 <SidebarTrigger /> 
    </div>
  )
}