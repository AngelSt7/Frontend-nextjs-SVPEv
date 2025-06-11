import api from "@/src/axios/axios";
import { DashboardReturnProduct } from "@/src/types/dashboard/ReturnProductTypes";
import { actions } from "@/src/utils/constants/constans";
import { isAxiosError } from "axios";

export type DashboardChangeStatusReturnServiceProps = {
    id: DashboardReturnProduct["id"];
    activo: DashboardReturnProduct["estado"];
};

export async function dashboardChangeStatusReturnService(formdata: DashboardChangeStatusReturnServiceProps) {
    try {
        const selected = actions[formdata.activo];
        const url = `/devolucion-producto/${selected.action}/${formdata.id}`;
        const { data } = await api.put(url);
        return data.mensaje
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
