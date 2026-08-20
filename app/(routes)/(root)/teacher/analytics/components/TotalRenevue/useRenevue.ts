'use client';

import { useQuery } from "@tanstack/react-query";

import axios from "axios";

export interface TotalRenevue {
    month:string;
    revenue:number;
}




export function useRenevue(){
    return useQuery<TotalRenevue[]>({
        queryKey:["Revenue"],
        queryFn:async()=>{
            const response = await axios.get<TotalRenevue[]>("/api/analytics/revenueByMonth");
            return response.data;
        }
    })
}