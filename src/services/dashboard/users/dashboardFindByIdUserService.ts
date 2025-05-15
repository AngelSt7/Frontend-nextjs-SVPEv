import api from "@/src/axios/axios";
import { DashboardUserByIdSchema } from "@/src/schemas/dashboard/Users";
import { isAxiosError } from "axios";

export async function dashboardFindByIdUserService(id : number) {
    try {
        const url = `/empleado/buscar/${id}`
        const { data } = await api.get(url)
        const response = DashboardUserByIdSchema.safeParse(data)
        if(response.success){
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}