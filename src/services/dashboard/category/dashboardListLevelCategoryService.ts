import api from "@/src/axios/axios";
import { DashboardLevelCategoriesSchema } from "@/src/schemas/dashboard/Category";
import { isAxiosError } from "axios";

export async function dashboardListLevelCategoryService({ level } : { level: number}) {
    try {
        const url = `/categoria/listar/nivel/${Number(level)}`
        const { data } = await api(url)
        const response = DashboardLevelCategoriesSchema.safeParse(data) 
        if(response.success){
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}