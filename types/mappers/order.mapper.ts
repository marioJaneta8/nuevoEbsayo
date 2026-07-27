import { Purchase, Course } from "@prisma/client";
import { OrderDTO } from "../orderDto";

export function toOrderDTO(
  purchase: Purchase & { course: Course },
): OrderDTO {
  return {
    id: purchase.id,
    userId: purchase.userId,
    courseId: purchase.courseId,
    title: purchase.course.title,
    price: purchase.price,
    createdAt: purchase.createdAt,
  };
}

export function toOrdersDTO(
  purchases: (Purchase & { course: Course })[],
): OrderDTO[] {
  return purchases.map(toOrderDTO);
}