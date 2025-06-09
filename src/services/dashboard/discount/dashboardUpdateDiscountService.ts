import api from "@/src/axios/axios";
import { DiscountFormData } from "@/src/types/DiscountTypes";
import { isAxiosError } from "axios";

export async function dashboardUpdateDiscountService(formData: DiscountFormData) {
    try {
        const url = '/descuento/actualizar'
        const { data } = await api.put(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}