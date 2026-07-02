"use client";

import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import {
  useMutation,
  useQueryClient,
  useQuery,
} from "@tanstack/react-query";
import { PurchaseResponse, PurchaseStatusResponse, EnrollmentPaymentResponse } from "@/types/purchaseDto";

interface UseHeroBlockCourseProps {
  id: string;
  sessionId?: string;
}

interface useWebhooksCompletedProps extends UseHeroBlockCourseProps {
  enabled?: boolean;
}

// API para inscribirse al curso gratis
export const useHeroBlockCourse = ({ id }: UseHeroBlockCourseProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (): Promise<PurchaseResponse> => {
      const res = await axios.post<PurchaseResponse>(
        `/api/course/${id}/enroll`,
      );
      return res.data;
    },

    onSuccess: (result) => {
      if (!result.success) {
        toast.error(result.error || "Error al comprar el curso");
        return;
      }

      queryClient.invalidateQueries({ queryKey: ["purchase", id] });
      toast.success("Curso inscrito correctamente");
    },

    onError: (
      error: AxiosError<{ message?: string }>,
    ) => {
      console.error("[ENROLL_CLIENT]", error);
      toast.error(error.response?.data?.message ?? "Error del servidor");
    },
  });
};

// Hook para verificar si el usuario ya posee el curso
export const usePurchasedStatus = (id: string) => {
  return useQuery({
    queryKey: ["purchase", id],
    queryFn: async (): Promise<PurchaseStatusResponse> => {
      const res = await axios.get<PurchaseStatusResponse>(
        `/api/course/${id}/enroll`,
      );
      return res.data;
    },
    enabled: !!id,
    staleTime: 1000 * 30, // 30 segundos considerándose datos frescos
  });
};

// useCheckout para redirección de pago a Stripe
export const useCheckout = ({ id }: UseHeroBlockCourseProps) => {
  return useMutation({
    mutationFn: async (): Promise<{ url: string }> => {
      const res = await axios.post<{ url: string }>(
        `/api/course/${id}/checkout`,
      );
      return res.data;
    },

    onSuccess: (result) => {
      if (!result.url) {
        toast.error("Error al generar el enlace de pago");
        return;
      }
      window.location.assign(result.url);
    },

    onError: (
      error: AxiosError<{ message?: string }>,
    ) => {
      console.error("[CHECKOUT_CLIENT]", error);
      toast.error(error.response?.data?.message ?? "Error del servidor");
    },
  });
};

// POLLING DEL WEBHOOK PARA EL PAGO COMPLETO (Corregido)
export const usePaymentStatus = ({
  id,
  enabled = false,
}: useWebhooksCompletedProps) => {
  return useQuery({
    queryKey: ["payment-status", id],

    queryFn: async (): Promise<EnrollmentPaymentResponse> => {
      const { data } = await axios.get(
        `/api/course/${id}/enrollPayment`
      );

      return data;
    },

    enabled: !!id && enabled,

    retry: 1,

    refetchInterval: (query) => {
      const status = query.state.data?.data?.payment;

      if (
        status === "COMPLETED" ||
        status === "FAILED" ||
        status === "UNPAID" ||
        status === "CANCELED"
      ) {
        return false;
      }

      return 3000;
    },

    refetchIntervalInBackground: true,
  });
};