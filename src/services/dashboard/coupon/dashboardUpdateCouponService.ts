import api from "@/src/axios/axios";
import { CouponFormData } from "@/src/types/dashboard/CouponTypes";
import { isAxiosError } from "axios";

export async function dashboardUpdateCouponService(formData: CouponFormData) {
    try {
        const url = '/cupon/actualizar'
        const { data } = await api.put(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}