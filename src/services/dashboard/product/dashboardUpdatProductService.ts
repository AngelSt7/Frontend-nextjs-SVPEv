import api from "@/src/axios/axios";
import { ProductFormData } from "@/src/types/dashboard/ProductTypes";
import { isAxiosError } from "axios";

export async function dashboardUpdatProductService(formData: ProductFormData) {
    try {
        const url = '/producto/actualizar'
        const { data } = await api.put(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}