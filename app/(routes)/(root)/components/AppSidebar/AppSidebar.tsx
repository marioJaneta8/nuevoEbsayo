"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { routes, teacherRoutes } from "./AppSidebar.data";
import Image from "next/image";

export function AppSidebar() {
  const { state } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-white">
        <SidebarHeader>
          <Link href="/" className="flex flex-row items-center gap-2">
            <Image src="/icon.png" alt="Logo" width={35} height={35} />

            {state === "expanded" && (
              <span className="text-xl font-semibold text-gray-800 tracking-wide">
                TarreLms
              </span>
            )}
          </Link>
        </SidebarHeader>

        {/* 🔵 PLATAFORMA */}
        <SidebarGroup>
          <SidebarGroupLabel>Plataforma</SidebarGroupLabel>

          <SidebarMenu className="space-y-2">
            {routes.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link
                    href={item.url}
                    className="flex items-center gap-2"
                  >
                    <div className="p-1 rounded-lg text-white bg-violet-400">
                      <item.icono className="w-4 h-4" />
                    </div>

                    {state === "expanded" && (
                      <span>{item.title}</span>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* 🟣 PROFESOR */}
        <SidebarMenu className="mt-4">
          <SidebarGroupLabel>Profesor</SidebarGroupLabel>

          <SidebarMenuItem>
            <SidebarMenuSub>
              {teacherRoutes.map((item) => (
                <SidebarMenuSubItem key={item.title}>
                  <SidebarMenuSubButton
                    asChild
                    className="hover:bg-muted transition"
                  >
                    <Link
                      href={item.url}
                      className="flex items-center gap-2"
                    >
                      <div className="p-1 rounded-lg text-white bg-slate-400">
                        <item.icono className="w-4 h-4" />
                      </div>

                      {item.title}
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}