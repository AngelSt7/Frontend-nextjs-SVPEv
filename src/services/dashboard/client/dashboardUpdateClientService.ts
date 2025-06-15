import api from "@/src/axios/axios";
import { ClientFormData } from "@/src/types/dashboard/ClientType";
import { isAxiosError } from "axios";

export async function dashboardUpdateClientService(formData: ClientFormData) {
    try {
        const url = '/cliente/actualizar'
        const { data } = await api.put(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}