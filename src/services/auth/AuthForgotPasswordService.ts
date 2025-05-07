import api from "@/src/axios/axios";
import { AuthForgotPassword } from "@/src/types/AuthTypes";
import { isAxiosError } from "axios";

export async function authForgotPasswordService(formData: AuthForgotPassword) {
    try {
        const url = '/auth/forgot-password'
        const { data } = await api.post(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}