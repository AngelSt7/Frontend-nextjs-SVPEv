import api from "@/src/axios/axios";
import { CouponFormData } from "@/src/types/dashboard/CouponTypes";
import { isAxiosError } from "axios";

export async function dashboardCreateCouponService(formData: CouponFormData) {
    try {
        const url = '/cupon/registrar'
        const { data } = await api.post(url, {
            ...formData,
            tipo_descuento: formData.tipo_descuento === 1 ? 'PORCENTAJE' : 'MONTO'
        })
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}