
'use client'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar"
import Link from "next/link"

export function AppSidebar() {

const {state}= useSidebar()


  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-white">
      <SidebarHeader>
        <Link href="/" className="flex flex-row items-center">
          <span className="font-bold">Tarre Lms</span>
        </Link>
      </SidebarHeader>
</SidebarContent>
    </Sidebar>
  )
}

