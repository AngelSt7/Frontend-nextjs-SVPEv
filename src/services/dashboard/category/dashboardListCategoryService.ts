import api from "@/src/axios/axios";
import { DashboardCategoriesSchema } from "@/src/schemas/dashboard/Category";
import { isAxiosError } from "axios";

export async function dashboardListCategoryService() {
    try {
        const url = '/categoria/listar'
        const { data } = await api(url)
        const response = DashboardCategoriesSchema.safeParse(data)
        if(response.success){
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}