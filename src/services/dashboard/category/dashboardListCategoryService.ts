import api from "@/src/axios/axios";
import { DashboardCategoriesSchema, DashboardCategorySchema } from "@/src/schemas/dashboard/Category";
import { isAxiosError } from "axios";

export async function dashboardListCategoryService() {
    try {
        const url = '/categoria/listar'
        const { data } = await api(url)
        const response = DashboardCategoriesSchema.safeParse(data)
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