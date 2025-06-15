
import api from "@/src/axios/axios";
import { ClientFormData } from "@/src/types/dashboard/ClientType";
import { isAxiosError } from "axios";

export async function dashboardCreateClientService(formData: ClientFormData) {
    try {
        const url = '/cliente/registrar'
        const { data } = await api.post(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}