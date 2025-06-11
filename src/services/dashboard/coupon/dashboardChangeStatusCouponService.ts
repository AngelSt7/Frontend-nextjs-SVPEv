import api from "@/src/axios/axios";
import { DashboardCoupon } from "@/src/types/dashboard/CouponTypes";
import { actions } from "@/src/utils/constants/constans";
import { isAxiosError } from "axios";

export type ChangeStatusCouponService = {
    id: DashboardCoupon["id"];
    activo: DashboardCoupon["activo"];
};

export async function dashboardChangeStatusCouponService(formdata: ChangeStatusCouponService) {
    try {
        const selected = actions[formdata.activo];
        const url = `/cupon/${selected.action}/${formdata.id}`;
        const { data } = await api.put(url);
        return data.mensaje
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
