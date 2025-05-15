import api from "@/src/axios/axios";
import { DashboardUsersSchema } from "@/src/schemas/dashboard/Users";
import { isAxiosError } from "axios";

export async function dashboardListUserService() {
    try {
        const url = '/empleado/listar'
        const { data } = await api(url)
        const response = DashboardUsersSchema.safeParse(data)
        console.log(data)
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