
import api from "@/src/axios/axios";
import { DashboardCouponsSchema } from "@/src/schemas/dashboard/Coupon";
import { isAxiosError } from "axios";

export async function dashboardListCouponService() {
    try {
        const url = '/cupones/listar'
        const { data } = await api(url)
        const response = DashboardCouponsSchema.safeParse(data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}