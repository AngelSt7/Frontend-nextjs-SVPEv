import api from "@/src/axios/axios";
import { DashboardReturnsProductsSchema } from "@/src/schemas/dashboard/ReturnProducts";
import { isAxiosError } from "axios";

export async function dashboardListReturnProductService() {
    try {
        // devolucion-producto
        const url = '/devolucion-producto/listar'
        const { data } = await api(url)
        const response = DashboardReturnsProductsSchema.safeParse(data)
        if(response.success){
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}