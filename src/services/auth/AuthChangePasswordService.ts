import api from "@/src/axios/axios";
import { AuthChangePassword } from "@/src/types/AuthTypes";
import { isAxiosError } from "axios";

export async function AuthChangePasswordService(formData: AuthChangePassword) {
    try {
        const url = '/auth/change-password'
        const { data } = await api.post(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}