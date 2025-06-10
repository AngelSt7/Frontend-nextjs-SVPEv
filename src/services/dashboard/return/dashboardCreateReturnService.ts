import api from "@/src/axios/axios";
import { CategoryFormData } from "@/src/types/dashboard/CategoryTypes";
import { ReturnFormData } from "@/src/types/dashboard/ReturnTypes";
import { isAxiosError } from "axios";

export async function dashboardCreateReturnService(formData: ReturnFormData) {
    try {
        const url = '/devoluciones/registrar'
        const { data } = await api.post(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}