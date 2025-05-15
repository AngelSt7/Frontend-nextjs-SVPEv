import api from "@/src/axios/axios";
import { UserFormData } from "@/src/types/UserTypes";
import { isAxiosError } from "axios";

export async function dashboardCreateUserService(formData: UserFormData) {
    try {
        const url = '/autenticacion/registro'
        const { data } = await api.post(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}