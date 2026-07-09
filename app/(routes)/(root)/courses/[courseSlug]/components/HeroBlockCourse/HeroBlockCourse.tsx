"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams,usePathname } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { toast } from "sonner";
import {
  Calendar,
  Timer,
  BookOpen,
  ChartNoAxesColumn,
  Loader2,
} from "lucide-react";

import { IconBadge } from "@/components/Shared";
import { Button } from "@/components/ui/button";
import { CourseWithChaptersDTO } from "@/types/mappers/chapter.mapper";
import { PaymentStatus } from "@/types/purchaseDto";
import {
  useCheckout,
  useHeroBlockCourse,
  usePurchasedStatus,
  usePaymentStatus,
} from "./useHeroBlockCourse";
import { formatDate, formatPrice } from "@/lib/formatPrice";

interface IHeroBlockCourse {
  course: CourseWithChaptersDTO;
  purchaseCourse: boolean;
}

export const HeroBlockCourse = ({
  course,
  purchaseCourse,
}: IHeroBlockCourse) => {
  const {
    title,
    chapters = [],
    description,
    price,
    imageUrl,
    updatedAt,
    slug,
    level,
    id,
  } = course;

  const { isSignedIn } = useAuth();
  const router = useRouter();

  const searchParams = useSearchParams();
  const cancelled = searchParams.get("cancelled");
  const success = searchParams.get("success");

  // ✅ FIX: siempre false — igual en server y client
  const [isVerifying, setIsVerifying] = useState(false);

  

  /*******************************************
   * HOOKS
   *******************************************/
//estado de compra
  const {
    data: purchaseStatus,
    //refetch para que cuando termine el webhook se actualice el estado
    refetch: refetchPurchaseStatus,
    isLoading: isLoadingStatus,
  } = usePurchasedStatus(id);
//si esta comprado
  const purchased = !!(purchaseStatus?.data?.purchased ?? purchaseCourse);
 //sirve para validar el webhook
  const enrollWebhooh = success === "1" && isVerifying && !purchased;
  //sirve para obtener el estado del webhook
  const { data: paymentStatusData } = usePaymentStatus({
    id,
    enabled: !!enrollWebhooh,
  });

  const { mutate: enrollFreeCourse, isPending: isPendingEnroll } =
    useHeroBlockCourse({ id });
  const { mutateAsync: createCheckout, isPending: isPendingCheckout } =
    useCheckout({ id });

    //limpiar url para que no se muestre el success o cancelled en la url
  
    const pathname= usePathname()
  
    const limpiarUrlParams = () => {
    if (typeof window !== "undefined") {
      router.replace(pathname, { scroll: false });
    }
  };

  /*******************************************
   * EFFECTS
   *******************************************/

  // ✅ Se corrige en el cliente después de montar
  // ✅ Efecto unificado para redirigir si el pago ya fue procesado muy rápido
  useEffect(() => {
    if (success === "1") {
      if (purchased) {
        setIsVerifying(false);
        toast.success("¡Pago exitoso! Llevándote a tu primera clase...");
        
        if (chapters?.[0]?.id) {
          router.push(`/courses/${slug}/${chapters[0].id}`);
        } else {
          limpiarUrlParams();
        }
      } else {
        setIsVerifying(true);
      }
    }
  }, [success, purchased, chapters, slug, router]);

  useEffect(() => {
    if (!paymentStatusData?.success) return;
    const paymentStatus = paymentStatusData.data?.payment;
    if (!paymentStatus) return;

    switch (paymentStatus) {
      case PaymentStatus.COMPLETED:
        toast.success("¡Pago procesado con éxito! Ya puedes acceder.");
        refetchPurchaseStatus().finally(() => {
          setIsVerifying(false);
          // Redirigir automáticamente al primer capítulo si existe
          if (chapters?.[0]?.id) {
            router.push(`/courses/${slug}/${chapters[0].id}`);
          } else {
            // Solo si no hay capítulos, limpiamos la URL y nos quedamos aquí
            limpiarUrlParams();
          }
        });
        break;
      case PaymentStatus.CANCELED:
        toast.error("El pago fue cancelado por el usuario");
        setIsVerifying(false);
        refetchPurchaseStatus();
        limpiarUrlParams();
        break;
      case PaymentStatus.FAILED:
        toast.error("El pago falló");
        setIsVerifying(false);
        limpiarUrlParams();
        break;
      case PaymentStatus.UNPAID:
        toast.warning("El pago no pudo completarse de manera inmediata.");
        setIsVerifying(false);
        refetchPurchaseStatus();
        limpiarUrlParams();
        break;
      case PaymentStatus.PENDING:
        break;
    }
  }, [paymentStatusData, refetchPurchaseStatus]);

  useEffect(() => {
    if (cancelled === "1") {
      toast.error("El pago fue cancelado por el usuario");
      limpiarUrlParams();
    }
  }, [cancelled]);

  /*******************************************
   * HANDLERS
   *******************************************/

  const enrollCourse = async () => {
    try {
      if (!isSignedIn) {
        router.push("/sign-in");
        return;
      }
      if (price === 0) {
        enrollFreeCourse(undefined, {
          onSuccess: () => {
            toast.success("Curso inscrito correctamente");
            if (chapters?.[0]?.id) {
              router.push(`/courses/${slug}/${chapters[0].id}`);
            } else {
              toast.error("Este curso no tiene capítulos disponibles todavía.");
            }
          },
        });
      } else {
        await createCheckout();
      }
    } catch (error) {
      console.error("[ENROLL_CLIENT]", error);
    }
  };

  const irAlCurso = () => {
    if (chapters?.[0]?.id) {
      router.push(`/courses/${slug}/${chapters[0].id}`);
    } else {
      toast.error("Este curso no tiene capítulos disponibles todavía.");
    }
  };

  
  return (
    <section className="mt-8">
      <div className="grid grid-cols-1 gap-4 mt-6 lg:grid-cols-2 items-center">
        {/* LADO IZQUIERDO */}
        <div className="space-y-6">
          <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
            Curso Online
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
            {title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            {description}
          </p>

          <div className="flex flex-wrap gap-4">
            <IconBadge
              icon={BookOpen}
              text={`${chapters?.length || 0} capítulos`}
            />
            <IconBadge icon={Timer} text="7h 40 minutos" />
            <IconBadge
              icon={Calendar}
              text={updatedAt ? formatDate(updatedAt) : "No disponible"}
            />
            <IconBadge icon={ChartNoAxesColumn} text={level || ""} />
          </div>

          <div className="flex items-center gap-4">
            <span
              className="text-4xl font-extrabold"
              style={{ color: "#7c3aed" }}
            >
              {price === 0 ? "Gratis" : formatPrice(price)}
            </span>
          </div>

          {/* ✅ BOTONES — envueltos en div */}
          <div>
            {purchased ? (
              <Button
                size="lg"
                onClick={irAlCurso}
                className="rounded-xl px-8 text-white font-medium flex items-center justify-center"
                style={{ backgroundColor: "#16a34a" }}
              >
                Continuar curso
              </Button>
            ) : price === 0 ? (
              <Button
                size="lg"
                disabled={isPendingEnroll}
                onClick={enrollCourse}
                className="rounded-xl px-8 text-white font-medium flex items-center justify-center gap-2"
                style={{ backgroundColor: "#7c3aed" }}
              >
                {isPendingEnroll && (
                  <Loader2 className="h-4 w-4 animate-spin text-white" />
                )}
                Inscribirse ahora (Gratis)
              </Button>
            ) : success === "1" || isVerifying ? (
              <Button
                size="lg"
                disabled
                className="rounded-xl px-8 text-white font-medium flex items-center justify-center gap-2"
                style={{ backgroundColor: "#d97706" }}
              >
                <Loader2 className="h-4 w-4 animate-spin text-white" />
                Verificando pago...
              </Button>
            ) : (
              <Button
                size="lg"
                disabled={isPendingCheckout}
                onClick={enrollCourse}
                className="rounded-xl px-8 text-white font-medium flex items-center justify-center gap-2"
                style={{ backgroundColor: "#7c3aed" }}
              >
                {isPendingCheckout && (
                  <Loader2 className="h-4 w-4 animate-spin text-white" />
                )}
                Comprar curso por {formatPrice(price)}
              </Button>
            )}
          </div>
        </div>

        {/* LADO DERECHO: PORTADA */}
        <div className="relative">
          <div className="absolute inset-0 rounded-3xl bg-violet-500/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-3xl border bg-white shadow-2xl">
            <Image
              src={imageUrl || "/default-image.png"}
              alt={title}
              width={500}
              height={400}
              priority
              className="w-full object-cover"
              style={{ height: "auto" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
