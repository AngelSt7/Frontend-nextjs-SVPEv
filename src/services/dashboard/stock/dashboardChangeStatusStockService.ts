import api from "@/src/axios/axios";
import { DashboardStock } from "@/src/types/dashboard/Stocktypes";
import { actions } from "@/src/utils/constants/constans";
import { isAxiosError } from "axios";

export type ChangeStatusStockService = {
    id: DashboardStock["id"];
    activo: DashboardStock["activo"];
};

export async function dashboardChangeStatusStockService(formdata: ChangeStatusStockService) {
    try {
        const selected = actions[formdata.activo];
        const url = `/ingresoStock/${selected.action}/${formdata.id}`;
        const { data } = await api.put(url);
        return data.mensaje
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
