import api from "@/src/axios/axios";
import { DashboardCategoryByIdSchema, DashboardCategorySchema } from "@/src/schemas/dashboard/Category";
import { isAxiosError } from "axios";

export async function dashboardFindByIdCategoryService(id : number) {
    try {
        const url = `/categoria/buscar/${id}`
        const { data } = await api.get(url)
        const response = DashboardCategoryByIdSchema.safeParse(data) 
        if(response.success){
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}