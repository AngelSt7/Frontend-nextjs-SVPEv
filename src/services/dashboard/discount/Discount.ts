import api from "@/src/axios/axios";
import { resolveError } from "@/src/utils/resolves/resolveError";
import { actions } from "@/src/utils/constants/constans";
import { ChangeStatus } from "@/src/utils/constants/changeStatus";
import { DiscountFormData } from "@/src/types/dashboard/DiscountTypes";
import { DashboardDiscountByIdSchema, DashboardDiscountsSchema } from "@/src/schemas/dashboard/Discount";

const ROUTES = {
    LIST: '/descuento/listar',
    FIND: '/descuento/buscar',
    UPDATE: '/descuento/actualizar',
    CHANGE_STATUS: '/descuento',
    CREATE: '/descuento/registrar'
};

export class Discount {

    static async create(formData: DiscountFormData) {
        try {
            const url = ROUTES.CREATE;
            const { data } = await api.post(url, formData)
            return data;
        } catch (error) { resolveError(error) }
    }

    static async list() {
        try {
            const url = ROUTES.LIST;
            const { data } = await api(url)
            const response = DashboardDiscountsSchema.safeParse(data)
            if (response.success) return response.data;
        } catch (error) { resolveError(error) }
    }

    static async find(id: number) {
        try {
            const url = `${ROUTES.FIND}/${id}`;
            const { data } = await api.get(url)
            const response = DashboardDiscountByIdSchema.safeParse(data)
            if (response.success) return response.data;
        } catch (error) { resolveError(error) }
    }

    static async update(formData: DiscountFormData) {
        try {
            const url = ROUTES.UPDATE;
            const { data } = await api.put(url, formData)
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
