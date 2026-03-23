import { BookOpen, ChartArea, GraduationCap, House, Settings2, SquareTerminal } from "lucide-react";

export const routes = [
  {
    title: "Home",
    url: "/",
    icono: House
  },

   {
    title: "Cursos",
    url: "/courses",
    icono: SquareTerminal
  },

   {
    title: "Mis cursos",
    url: "/my-courses",
    icono: BookOpen
  },
   {
    title: "Ajustes",
    url: "/settings",
    icono: Settings2
  },
]


export const teacherRoutes=[
     {
    title: "Cursos",
    url: "/teacher",
    icono: GraduationCap
  },

   {
    title: "Analíticas",
    url: "/teacher/analytics",
    icono: ChartArea
  },


  
]
