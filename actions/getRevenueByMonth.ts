import { prisma } from "@/lib/prisma";
import {
  subMonths,
  startOfMonth,
  endOfMonth,
  format,
} from "date-fns";
import { es } from "date-fns/locale";

export async function getRevenueByMonth() {
  try {
    const now = new Date();

    const months = Array.from(
      { length: 6 },
      (_, i) => subMonths(now, 5 - i),
    );

    const result = await Promise.all(
      months.map(async (monthDate) => {
        const start = startOfMonth(monthDate);
        const end = endOfMonth(monthDate);

        const purchases = await prisma.purchase.findMany({
          where: {
            createdAt: {
              gte: start,
              lte: end,
            },
          },
          include: {
            course: {
              select: {
                price: true,
              },
            },
          },
        });

        const totalRevenue = purchases.reduce(
          (sum, purchase) => {
            const price = Number(purchase.course.price ?? 0);

            return sum + price;
          },
          0,
        );

        return {
          month: format(monthDate, "MMMM", {
            locale: es,
          }),
          revenue: Number(totalRevenue.toFixed(2)),
        };
      }),
    );

    return result;
  } catch (error) {
    console.error("[GET_REVENUE_BY_MONTH]", error);

    return null;
  }
}