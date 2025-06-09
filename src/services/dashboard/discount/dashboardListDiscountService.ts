import api from "@/src/axios/axios";
import { DashboardDiscountsSchema } from "@/src/schemas/dashboard/Discount";
import { isAxiosError } from "axios";

export async function dashboardListDiscountService() {
    try {
        const url = '/descuentos/listar'
        const { data } = await api(url)
        const response = DashboardDiscountsSchema.safeParse(data)
        if(response.success){
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}