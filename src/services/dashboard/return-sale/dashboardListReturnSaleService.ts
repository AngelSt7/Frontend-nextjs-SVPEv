import api from "@/src/axios/axios";
import { DashboardReturnsSalesSchema } from "@/src/schemas/dashboard/Return-sale";
import { isAxiosError } from "axios";

export async function dashboardListReturnSaleService() {
    try {
        const url = '/devolucion-venta/listar'
        const { data } = await api(url)
        const response = DashboardReturnsSalesSchema.safeParse(data)
        if(response.success){
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}