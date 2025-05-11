import api from "@/src/axios/axios";
import { SupplierFormData } from "@/src/types/DashboardTypes";
import { isAxiosError } from "axios";

export async function dashboardUpdateSupplierService(formData: SupplierFormData) {
    try {
        const url = '/proveedores/actualizar'
        const { data } = await api.put(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}