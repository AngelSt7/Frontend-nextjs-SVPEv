import api from "@/src/axios/axios";
import { DashboardSuppliersSchema } from "@/src/schemas/dashboard/Suppliers";
import { isAxiosError } from "axios";

export async function dashboardListSupplierService() {
    try {
        const url = '/proveedores/listar'
        const { data } = await api(url)
        const response = DashboardSuppliersSchema.safeParse(data)
        if(response.success){
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}