import api from "@/src/axios/axios";
import { SupplierByIdSchema } from "@/src/schemas/dashboard/Suppliers";
import { isAxiosError } from "axios";

export async function dashboardFindByIdSupplierService(id : number) {
    try {
        const url = `/proveedores/buscar/${id}`
        const { data } = await api.get(url)
        const response = SupplierByIdSchema.safeParse(data)
        console.log(response)
        if(response.success){
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}