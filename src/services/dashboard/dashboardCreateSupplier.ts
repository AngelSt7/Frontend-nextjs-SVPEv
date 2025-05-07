import api from "@/src/axios/axios";
import { CreateSupplier } from "@/src/types/DashboardTypes";
import { isAxiosError } from "axios";

export async function dashboardCreateSupplier(formData: CreateSupplier) {
    try {
        const url = 'http://localhost:4000/api/supplier/create'
        console.log(formData)
        const { data } = await api.post(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}