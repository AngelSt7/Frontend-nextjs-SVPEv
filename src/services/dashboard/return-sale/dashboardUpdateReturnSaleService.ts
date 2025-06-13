import api from "@/src/axios/axios";
import { ReturnSaleFormData } from "@/src/types/dashboard/ReturnSaleTypes";
import { isAxiosError } from "axios";

export async function dashboardUpdateReturnSaleService(formData: ReturnSaleFormData) {
    try {
        const url = '/devolucion-venta/actualizar'
        const { data } = await api.put(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}