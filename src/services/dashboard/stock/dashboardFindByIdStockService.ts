import api from "@/src/axios/axios";
import { DashboardStockByIdSchema } from "@/src/schemas/dashboard/Stock";
import { isAxiosError } from "axios";

export async function dashboardFindByIdStockService(id : number) {
    try {
        const url = `/ingresoStock/buscar/${id}`
        const { data } = await api.get(url)
        const response = DashboardStockByIdSchema.safeParse(data)
        if(response.success){
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}