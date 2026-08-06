import { prisma } from "@/lib/prisma";
import { CertificateDTO } from "@/types/certificateDto";
import { toCertificatesDto } from "@/types/mappers/certificate.mapper";

// se encarga de obtener los cursos comprados por el usuario
export async function getPurchasesCourse(
  userId: string,
): Promise<CertificateDTO[]> {
  try {
    const purchases = await prisma.purchase.findMany({
      where: {
        userId: userId,
        payment: {
          status: "COMPLETED",
        },
      },
      include: {
        course: true,
        payment: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return toCertificatesDto(purchases);
  } catch (error) {
    console.error("[getPurchasesCourse] Error:", error);
    return [];
  }
}
