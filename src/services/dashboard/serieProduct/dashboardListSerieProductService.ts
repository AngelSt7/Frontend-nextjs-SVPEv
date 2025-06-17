import api from "@/src/axios/axios";
import { DashboardSeriesProductSchema } from "@/src/schemas/dashboard/SerieProduct";
import { isAxiosError } from "axios";

export async function dashboardListSerieProductService() {
    try {
        const url = '/serie-producto/listar'
        const { data } = await api(url)
        const response = DashboardSeriesProductSchema.safeParse(data)
        if(response.success){
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
