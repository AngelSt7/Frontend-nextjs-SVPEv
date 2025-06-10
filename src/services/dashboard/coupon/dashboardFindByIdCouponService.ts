import api from "@/src/axios/axios";
import { DashboardCouponByIdSchema } from "@/src/schemas/dashboard/Coupon";
import { isAxiosError } from "axios";

export async function dashboardFindByIdCouponService(id : number) {
    try {
        const url = `/cupon/buscar/${id}`
        const { data } = await api.get(url)
        const response = DashboardCouponByIdSchema.safeParse(data)
        if(response.success){
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}