import api from "@/src/axios/axios";
import { SupplierFormData } from "@/src/types/dashboard/DashboardTypes";
import { isAxiosError } from "axios";

export async function dashboardCreateSupplierService(formData: SupplierFormData) {
    try {
        const url = '/proveedores/registrar'
        const { data } = await api.post(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}