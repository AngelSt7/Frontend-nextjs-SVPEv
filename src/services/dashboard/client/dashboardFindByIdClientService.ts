import api from "@/src/axios/axios";
import { DashboardClientByIdSchema } from "@/src/schemas/dashboard/Client";
import { isAxiosError } from "axios";

export async function dashboardFindByIdClientService(id : number) {
    try {
        const url = `/cliente/buscar/${id}`
        const { data } = await api.get(url)
        const response = DashboardClientByIdSchema.safeParse(data) 
        if(response.success){
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}