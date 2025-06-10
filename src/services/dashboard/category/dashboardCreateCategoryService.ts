import api from "@/src/axios/axios";
import { CategoryFormData } from "@/src/types/dashboard/CategoryTypes";
import { isAxiosError } from "axios";

export async function dashboardCreateCategoryService(formData: CategoryFormData) {
    try {
        const url = '/categoria/registrar'
        const { data } = await api.post(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}