import api from "@/src/axios/axios";
import { DashboardProductByIdSchema } from "@/src/schemas/dashboard/Products";
import { isAxiosError } from "axios";

export async function dashboardFindByIdProductService(id : number) {
    try {
        const url = `/producto/buscar/${id}`
        const { data } = await api.get(url)
        const response = DashboardProductByIdSchema.safeParse(data)

        console.log(response)
        console.log(data)
        if(response.success){
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}