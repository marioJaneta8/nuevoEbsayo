"use client";

import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useMutation, useQueryClient, useQuery, QueryClient } from "@tanstack/react-query";
import { PurchaseResponse, PurchaseStatusResponse } from "@/types/purchaseDto";

interface UseHeroBlockCourseProps {
  id: string;
}

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

     

      queryClient.invalidateQueries({ queryKey: ["purchase", id] 

      });

        toast.success("Curso inscrito correctamente");
    },

    onError: (
      error: AxiosError<{
        message?: string;
      }>,
    ) => {
      console.error("[ENROLL_CLIENT]", error);

      toast.error(error.response?.data?.message ?? "Error del servidor");
    },
  });
};


export const usePurchasedStatus=(id:string)=>{
  const queryClient = useQueryClient();
  
  return useQuery({
    queryKey:["purchase",id],
    queryFn:async ():Promise<PurchaseStatusResponse>=>{
      const res = await axios.get<PurchaseStatusResponse>(
        `/api/course/${id}/enroll`,
      );

   return res.data
    },
    enabled:!!id,
    staleTime: 1000 * 30,
  })
}
 




