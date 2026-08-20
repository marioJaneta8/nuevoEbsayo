import { prisma } from "@/lib/prisma";
import { subMonths, startOfMonth, format } from "date-fns";
import { es } from "date-fns/locale";

export async function getSubscribersByMonth() {
  try {
    const now = new Date();

    // Primer día del mes de hace 5 meses
    const startDate = startOfMonth(subMonths(now, 5));

    // Obtener compras de los últimos 6 meses
    const purchases = await prisma.purchase.findMany({
      where: {
        createdAt: {
          gte: startDate,
        },
      },
      select: {
        createdAt: true,
      },
    });

    // Crear los últimos 6 meses
    const months = Array.from({ length: 6 }, (_, i) => {
      const date = subMonths(now, 5 - i);

      return {
        month: format(date, "LLLL", { locale: es }),
        date: format(date, "yyyy-MM"),
        users: 0,
      };
    });

    // Contar compras por mes
    purchases.forEach((purchase) => {
      const purchaseMonth = format(
        purchase.createdAt,
        "yyyy-MM"
      );

      const month = months.find(
        (month) => month.date === purchaseMonth
      );

      if (month) {
        month.users++;
      }
    });

    // Devolver solamente lo necesario
    return months.map(({ month, users }) => ({
      month,
      users,
    }));
  } catch (error) {
    console.error("[GET_SUBSCRIBERS_BY_MONTH]", error);

    return [];
  }
}