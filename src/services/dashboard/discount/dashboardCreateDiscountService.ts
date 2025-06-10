import api from "@/src/axios/axios";
import { DiscountFormData } from "@/src/types/dashboard/DiscountTypes";
import { isAxiosError } from "axios";

export async function dashboardCreateDiscountService(formData: DiscountFormData) {
    try {
        const url = '/descuento/registrar'
        const { data } = await api.post(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}