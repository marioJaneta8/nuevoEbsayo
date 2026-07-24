import { 
  BookOpen, 
  ChartArea, 
  GraduationCap, 
  House, 
  SquareTerminal,
  LucideIcon,
  ReceiptText,
  Award
} from "lucide-react";

type Route = {
  title: string;
  url: string;
  icono: LucideIcon;
};

export const routes: Route[] = [
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
    title: "Pedidos",
    url: "/orders",
    icono: ReceiptText
  },

  {
    title: "Certificados",
    url: "/certificates",
    icono: Award
  },



];

export const teacherRoutes: Route[] = [
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
];