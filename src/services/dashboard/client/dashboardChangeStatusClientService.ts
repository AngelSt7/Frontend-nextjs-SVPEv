import api from "@/src/axios/axios";
import { DashboardClient } from "@/src/types/dashboard/ClientType";
import { actions } from "@/src/utils/constants/constans";
import { isAxiosError } from "axios";

export type ChangeStatusClientService = {
    id: DashboardClient["id"];
    activo: DashboardClient["activo"];
};

export async function dashboardChangeStatusClientService(formdata: ChangeStatusClientService) {
    try {
        const selected = actions[formdata.activo];
        const url = `/cliente/${selected.action}/${formdata.id}`;
        const { data } = await api.put(url);
        return data.mensaje
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
