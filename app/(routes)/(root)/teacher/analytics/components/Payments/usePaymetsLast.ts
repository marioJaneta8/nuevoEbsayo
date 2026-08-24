import { LastPurchaseDto } from "@/types/lastPurchaseDto";
import { useQuery } from "@tanstack/react-query";

import axios from "axios";

interface lastPurchaseResponse {
  data: LastPurchaseDto[];
}


export function usePaymentsLast() {
  return useQuery<LastPurchaseDto[]>({
    queryKey: ["last-purchases"],
    queryFn: async () => {
      const response = await axios.get<lastPurchaseResponse>(
        "/api/analytics/toLastPurchases",
      );

      return response.data.data;
    },
  });
}