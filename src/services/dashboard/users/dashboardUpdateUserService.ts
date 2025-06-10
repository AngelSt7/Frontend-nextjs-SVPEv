import api from "@/src/axios/axios";
import { UserFormData } from "@/src/types/dashboard/UserTypes";
import { isAxiosError } from "axios";

export async function dashboardUpdateUserService(formData: UserFormData) {
    try {
        const url = `/empleado/actualizar`
        const { data } = await api.put(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}