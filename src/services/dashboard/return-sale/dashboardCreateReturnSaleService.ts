import api from "@/src/axios/axios";
import { CategoryFormData } from "@/src/types/dashboard/CategoryTypes";
import { ReturnSaleFormData } from "@/src/types/dashboard/ReturnSaleTypes";
import { isAxiosError } from "axios";

export async function dashboardCreateReturnSaleService(formData: ReturnSaleFormData) {
    try {
        const url = '/devolucion-venta/registrar'
        const { data } = await api.post(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}