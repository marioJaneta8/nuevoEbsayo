"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { BellRing, LogIn, Search } from "lucide-react";

export function NavBar() {
  return (
    <div className="flex items-center justify-between px-4 h-16 border-b bg-white">
      
      {/* 🔹 IZQUIERDA */}
      <div className="flex items-center gap-4">
        <SidebarTrigger />

        <div className="flex items-center w-full max-w-sm border rounded-lg px-2 py-1">
          <Search className="w-4 h-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Buscar..."
            className="border-0 focus-visible:ring-0"
          />
        </div>
      </div>

      {/* 🔹 DERECHA */}
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon">
          <BellRing className="w-4 h-4" />
        </Button>

        <Show when="signed-out">
          <SignInButton mode="modal">
            <Button variant="outline" className="flex items-center gap-2">
              <LogIn className="w-4 h-4" />
              Iniciar sesión
            </Button>
          </SignInButton>

          <SignUpButton mode="modal">
            <Button className="flex items-center gap-2">
              Registrarse
            </Button>
          </SignUpButton>
        </Show>

        <Show when="signed-in">
          <UserButton />
        </Show>
      </div>
    </div>
  );
}