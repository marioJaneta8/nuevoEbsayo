import axios, { AxiosError } from "axios";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { ProgressDTO, ProgressResponse, ProgressResponseList } from "@/types/progressDto";

// 1. Interfaz SOLO para obtener el progreso general (Lectura)
interface QueryParams {
    id: string; // Este es el courseId
    initialData?: ProgressDTO[];
}

// 2. Interfaz SOLO para actualizar un video (Escritura)
interface MutationParams {
    id: string; // Este es el courseId
    chapterId: string; // El capítulo que acabamos de ver
}

// Hook de Lectura (Usa QueryParams)//get:
export const useProgress = ({ id, initialData }: QueryParams) => {
    return useQuery({
        queryKey: ["progress", id],
        queryFn: async (): Promise<ProgressResponseList> => {
            const res = await axios.get<ProgressResponseList>(`/api/course/${id}/progress`);
            return res.data;
        },
        enabled: !!id,
        initialData: {
            success: true,
            data: initialData ?? [],
        }
    });
};

// Hook de Escritura (Usa MutationParams)
export const useProgressMutation = ({ id, chapterId }: MutationParams) => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async ():Promise<ProgressResponse> => {
          const res = await axios.patch<ProgressResponse>(`/api/course/${id}/chapter/${chapterId}/progress`);
            return res.data;
        },
        onSuccess: (result: ProgressResponse) => {
            if (!result.success) {
                return;
            }
            queryClient.invalidateQueries({ queryKey: ["progress", id] });
        },  
        onError: (error: AxiosError<{ message?: string }>) => {
            console.error("[UPDATE_PROGRESS_ERROR]", error);
        },
    });
};