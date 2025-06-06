import api from "@/src/axios/axios";
import { CategoryFormData } from "@/src/types/CategoryTypes";
import { isAxiosError } from "axios";

export async function dashboardUpdatCategoryService(formData: CategoryFormData) {
    try {
        const url = '/categoria/actualizar'
        const { data } = await api.put(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}