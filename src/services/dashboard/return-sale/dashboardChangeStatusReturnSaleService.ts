import api from "@/src/axios/axios";
import { DashboardReturnSale } from "@/src/types/dashboard/ReturnSaleTypes";
import { actions } from "@/src/utils/constants/constans";
import { isAxiosError } from "axios";

export type DashboardChangeStatusReturnSaleServiceProps = {
    id: DashboardReturnSale["id"];
    activo: DashboardReturnSale["activo"];
};

export async function dashboardChangeStatusReturnSaleService(formdata: DashboardChangeStatusReturnSaleServiceProps) {
    try {
        const selected = actions[formdata.activo];
        const url = `/devolucion-venta/${selected.action}/${formdata.id}`;
        const { data } = await api.put(url);
        return data.mensaje
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
