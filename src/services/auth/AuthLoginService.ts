import api from "@/src/axios/axios";
import { AuthLogin  } from "@/src/types/AuthTypes";
import { isAxiosError } from "axios";

export async function authLoginService(formData: AuthLogin) {
    try {
        const url = '/autenticacion/login'
        const { data } = await api.post(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}