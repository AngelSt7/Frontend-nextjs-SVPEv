import api from "@/src/axios/axios";
import { resolveError } from "@/src/utils/resolves/resolveError";
import { actions } from "@/src/utils/constants/constans";
import { ChangeStatus } from "@/src/utils/constants/changeStatus";
import { CouponFormData } from "@/src/types/dashboard/CouponTypes";
import { DashboardCouponByIdSchema, DashboardCouponsSchema } from "@/src/schemas/dashboard/Coupon";

const ROUTES = {
    LIST: '/cupon/listar',
    FIND: '/cupon/buscar',
    UPDATE: '/cupon/actualizar',
    CHANGE_STATUS: '/cupon',
    CREATE: '/cupon/registrar'
};

export class Coupon {

    static async create(formData: CouponFormData) {
        try {
            const url = ROUTES.CREATE;
            const { data } = await api.post(url, {
                ...formData,
                tipo_descuento: formData.tipo_descuento === 1 ? 'PORCENTAJE' : 'MONTO'
            })
            return data;
        } catch (error) { resolveError(error) }
    }

    static async list() {
        try {
            const url = ROUTES.LIST;
            const { data } = await api(url)
            const response = DashboardCouponsSchema.safeParse(data)
            if (response.success) return response.data;
        } catch (error) { resolveError(error) }
    }

    static async find(id: number) {
        try {
            const url = `${ROUTES.FIND}/${id}`;
            const { data } = await api.get(url)
            const response = DashboardCouponByIdSchema.safeParse(data)
            if (response.success) return response.data;
        } catch (error) { resolveError(error) }
    }

    static async update(formData: CouponFormData) {
        try {
            const url = ROUTES.UPDATE;
            const { data } = await api.put(url, {
                ...formData,
                tipo_descuento: formData.tipo_descuento === 1 ? 'PORCENTAJE' : 'MONTO'
            })
            return data;
        } catch (error) { resolveError(error) }
    }

    static async changeStatus(formdata: ChangeStatus) {
        try {
            const selected = actions[formdata.status];
            const url = `${ROUTES.CHANGE_STATUS}/${selected.action}/${formdata.id}`;
            const { data } = await api.put(url);
            return data.mensaje;
        } catch (error) { resolveError(error) }
    }
}
