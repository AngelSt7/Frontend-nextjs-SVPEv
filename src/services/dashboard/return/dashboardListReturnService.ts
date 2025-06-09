import api from "@/src/axios/axios";
import { DashboardReturnsSchema } from "@/src/schemas/dashboard/Return";
import { isAxiosError } from "axios";

export async function dashboardListReturnService() {
    try {
        const url = '/devoluciones/listar'
        const { data } = await api(url)
        const response = DashboardReturnsSchema.safeParse(data)
        if(response.success){
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}