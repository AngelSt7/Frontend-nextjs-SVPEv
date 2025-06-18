import api from "@/src/axios/axios";
import { DashboardDiscountByIdSchema } from "@/src/schemas/dashboard/Discount";
import { isAxiosError } from "axios";

export async function dashboardFindByIdDiscountService(id : number) {
    try {
        const url = `/descuento/buscar/${id}`
        const { data } = await api.get(url)
        const response = DashboardDiscountByIdSchema.safeParse(data)
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