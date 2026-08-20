
import {useQuery} from "@tanstack/react-query" 
import axios from "axios"

export interface SuscriptorByMont{
    month: string;
    users: number;
}

interface SubscribersResponse {
    data: SuscriptorByMont[]
}

export const useSuscriptorChart = () => {
    return useQuery<SuscriptorByMont[]>({
        queryKey: ["suscriptor-by-month"],
        queryFn: async () => {
            const response = await axios.get<SubscribersResponse>("/api/analytics/totalSuscriptors")
            return response.data.data
        }
    })
} 