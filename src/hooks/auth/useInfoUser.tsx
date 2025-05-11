import api from "@/src/axios/axios"
import { AuthUserInfoSchema } from "@/src/schemas/Auth"
import { isAxiosError } from "axios"

export default async function useInfoUser() {
    try {
        const { data } = await api('/usuario/info')
        const response = AuthUserInfoSchema.safeParse(data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}