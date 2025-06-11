import api from "@/src/axios/axios";
import { ReturnProductFormData } from "@/src/types/dashboard/ReturnProductTypes";
import { isAxiosError } from "axios";

export async function dashboardUpdateReturnService(formData: ReturnProductFormData) {
    try {
        const url = '/devolucion-producto/actualizar'
        const { data } = await api.put(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}