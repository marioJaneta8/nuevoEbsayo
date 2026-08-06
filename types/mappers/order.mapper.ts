import { Purchase, Course, Payment } from "@prisma/client";
import { OrderDTO } from "../orderDto";


type PurchaseWithCourseAndPayment = Purchase & {
  course: Course;
  payment: Payment | null;
};

export function toOrderDTO(
  purchase: PurchaseWithCourseAndPayment,
): OrderDTO {
  return {
     id: purchase.id,
    userId: purchase.userId,
    courseId: purchase.courseId,
    title: purchase.course.title,
    price: purchase.price,
    paymentId: purchase.paymentId,
    paymentStatus: purchase.payment?.status ?? null,
    createdAt: purchase.createdAt,
  };
}

export function toOrdersDTO(
  purchases: PurchaseWithCourseAndPayment[],
): OrderDTO[] {
  return purchases.map(toOrderDTO);
}