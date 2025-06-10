import api from "@/src/axios/axios";
import { DashboardStocksSchema } from "@/src/schemas/dashboard/Stock";
import { isAxiosError } from "axios";

export async function dashboardListStockService() {
    try {
        const url = '/ingresoStock/listar'
        const { data } = await api(url)
        const response = DashboardStocksSchema.safeParse(data)
        if(response.success){
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}