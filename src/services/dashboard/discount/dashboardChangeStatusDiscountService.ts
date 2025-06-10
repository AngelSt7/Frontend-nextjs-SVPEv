import api from "@/src/axios/axios";
import { CategoryFormData, DashboardCategory } from "@/src/types/dashboard/CategoryTypes";
import { DashboardDiscount } from "@/src/types/dashboard/DiscountTypes";
import { actions } from "@/src/utils/constants/constans";
import { isAxiosError } from "axios";

export type ChangeStatusDiscountService = {
    id: DashboardDiscount["id"];
    activo: DashboardDiscount["activo"];
};

export async function dashboardChangeStatusDiscountService(formdata: ChangeStatusDiscountService) {
    try {
        const selected = actions[formdata.activo];
        const url = `/descuento/${selected.action}/${formdata.id}`;
        const { data } = await api.put(url);
        return data.mensaje
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
