

import api from "@/src/axios/axios";
import { DashboardSale } from "@/src/types/dashboard/SaleTypes";
import { actionsSale } from "@/src/utils/constants/constans";
import { isAxiosError } from "axios";

export type ChangeStatusSaleService = {
    id: DashboardSale["id"];
    activo: DashboardSale["activo"];
};

export async function dashboardChangeStatusSalesService(formdata: ChangeStatusSaleService) {
    try {
        const selected = actionsSale[formdata.activo];
        const url = `/venta/${selected.action}/${formdata.id}`;
        const { data } = await api.put(url);
        return data.mensaje
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
