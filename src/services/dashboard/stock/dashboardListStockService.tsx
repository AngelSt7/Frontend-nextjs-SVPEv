import api from "@/src/axios/axios";
import { DashboardStocksSchema } from "@/src/schemas/dashboard/Stock";
import { isAxiosError } from "axios";

export async function dashboardListStockService() {
    try {
        const url = '/ingresoStock/listar'
        const { data } = await api(url)
        console.log(data[0])
        const response = DashboardStocksSchema.safeParse(data)
        console.log(response)
        if(response.success){
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}