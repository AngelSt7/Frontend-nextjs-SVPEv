import api from "@/src/axios/axios";
import { DashboardProductsSchema } from "@/src/schemas/dashboard/Products";
import { isAxiosError } from "axios";

export async function dashboardListProductService() {
    try {
        const url = '/producto/listar'
        const { data } = await api(url)
        const response = DashboardProductsSchema.safeParse(data)
        if(response.success){
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}


export async function dashboardListProductSalesService() {
    try {
        const url = '/producto/listar'
        const { data } = await api(url)
        const response = DashboardProductsSchema.safeParse(data)
        if(response.success){
            return response.data.filter(product => product.stock_actual > (product.min_stock + 5) && product.activo === 1)
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}