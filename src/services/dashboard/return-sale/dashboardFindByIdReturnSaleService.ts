import api from "@/src/axios/axios";
import { DashboardDiscountByIdSchema } from "@/src/schemas/dashboard/Discount";
import { DashboardReturnSaleByIdSchema } from "@/src/schemas/dashboard/Return-sale";
import { isAxiosError } from "axios";

export async function dashboardFindByIdReturnSaleService(id : number) {
    try {
        const url = `/devolucion-venta/buscar/${id}`
        const { data } = await api.get(url)
        const response = DashboardReturnSaleByIdSchema.safeParse(data)
        if(response.success){
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}