import api from "@/src/axios/axios";
import { ReturnFormData } from "@/src/types/ReturnTypes";
import { isAxiosError } from "axios";

export async function dashboardUpdateReturnService(formData: ReturnFormData) {
    try {
        const url = '/devolución/actualizar'
        const { data } = await api.put(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}