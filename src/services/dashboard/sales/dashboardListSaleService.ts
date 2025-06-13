
import api from "@/src/axios/axios";
import { DashboardSalesSchema } from "@/src/schemas/dashboard/Sales";
import { DashboardStocksSchema } from "@/src/schemas/dashboard/Stock";
import { isAxiosError } from "axios";

export async function dashboardListSaleService() {
    try {
        const url = '/venta/listar'
        const { data } = await api(url)
        const response = DashboardSalesSchema.safeParse(data)
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