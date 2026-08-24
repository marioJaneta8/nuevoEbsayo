import { LastPurchaseDto } from "../lastPurchaseDto";

interface PurchaseMapperInput {
  id: string;
  userId: string;
  createdAt: Date;
  course: {
    title: string;
    slug: string;
    imageUrl: string | null;
    price: number | null;
  };
  userEmail: string;
}

export function toLastPurchaseDto(input:PurchaseMapperInput):LastPurchaseDto{
    return {
        id:input.id,
        userId:input.userId,
        userEmail:input.userEmail,
        courseTitle:input.course.title,
        courseSlug:input.course.slug,
        courseImageUrl:input.course.imageUrl ?? "",
        price:input.course.price ?? 0,
        createdAt:input.createdAt,
    }
}

export function toLastPurchasesDTO(
  purchases: PurchaseMapperInput[],
): LastPurchaseDto[] {
  return purchases.map(toLastPurchaseDto);
}