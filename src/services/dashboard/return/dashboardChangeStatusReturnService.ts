import api from "@/src/axios/axios";
import { DashboardReturn } from "@/src/types/dashboard/ReturnTypes";
import { actions } from "@/src/utils/constants/constans";
import { isAxiosError } from "axios";

export type DashboardChangeStatusReturnServiceProps = {
    id: DashboardReturn["id"];
    activo: DashboardReturn["activo"];
};

export async function dashboardChangeStatusReturnService(formdata: DashboardChangeStatusReturnServiceProps) {
    try {
        const selected = actions[formdata.activo];
        const url = `/devoluciones/${selected.action}/${formdata.id}`;
        const { data } = await api.put(url);
        return data.mensaje
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
