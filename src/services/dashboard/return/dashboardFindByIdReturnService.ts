import api from "@/src/axios/axios";
import { DashboardDiscountByIdSchema } from "@/src/schemas/dashboard/Discount";
import { DashboardReturnByIdSchema } from "@/src/schemas/dashboard/Return";
import { isAxiosError } from "axios";

export async function dashboardFindByIdReturnService(id : number) {
    try {
        const url = `/devolucion/buscar/${id}`
        const { data } = await api.get(url)
        const response = DashboardReturnByIdSchema.safeParse(data)
        if(response.success){
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}