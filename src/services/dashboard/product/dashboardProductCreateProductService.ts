import api from "@/src/axios/axios";
import { ProductFormData } from "@/src/types/ProductTypes";
import { isAxiosError } from "axios";



export async function dashboardProductCreateProductService(formData: ProductFormData) {
    try {
        const url = '/producto/registrar'
        const { data } = await api.post(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}