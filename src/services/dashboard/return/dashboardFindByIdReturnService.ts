import api from "@/src/axios/axios";
import { isAxiosError } from "axios";
import { DashboardReturnProductByIdSchema } from '@/src/schemas/dashboard/ReturnProducts';

export async function dashboardFindByIdReturnService(id : number) {
    try {
        const url = `/devolucion-producto/buscar/${id}`
        const { data } = await api.get(url)
        const response = DashboardReturnProductByIdSchema.safeParse(data)
        if(response.success){
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}