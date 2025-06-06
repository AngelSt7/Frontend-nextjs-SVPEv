import api from "@/src/axios/axios";
import { SupplierFormData } from "@/src/types/DashboardTypes";
import { isAxiosError } from "axios";

export async function dashboardCreateSupplierService(formData: SupplierFormData) {
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