import api from "@/src/axios/axios";
import { DashboardClientsSchema } from "@/src/schemas/dashboard/Client";
import { isAxiosError } from "axios";

export async function dashboardListClientService() {
    try {
        const url = '/cliente/listar'
        const { data } = await api(url)
        const response = DashboardClientsSchema.safeParse(data)
        if(response.success){
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
