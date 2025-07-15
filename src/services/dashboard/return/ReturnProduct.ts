import api from "@/src/axios/axios";
import { resolveError } from "@/src/utils/resolves/resolveError";
import { actions } from "@/src/utils/constants/constans";
import { ChangeStatus } from "@/src/utils/constants/changeStatus";
import { ReturnProductFormData } from "@/src/types/dashboard/ReturnProductTypes";
import { DashboardReturnProductByIdSchema, DashboardReturnsProductsSchema } from "@/src/schemas/dashboard/ReturnProducts";

const ROUTES = {
    LIST: '/devolucion-producto/listar',
    FIND: '/devolucion-producto/buscar',
    UPDATE: '/devolucion-producto/actualizar',
    CHANGE_STATUS: '/devolucion-producto',
    CREATE: '/devolucion-producto/registrar'
};

export class ReturnProduct {

    static async create(formData: ReturnProductFormData) {
        try {
            const url = ROUTES.CREATE;
            const payload = {
                ...formData,
                tipo_serie: formData.series.length > 0 ? "CON_SERIE" : "SIN_SERIE",
                ...(formData.series && formData.series.length > 0 ? { series: formData.series.split(',').filter(s => Number(s) !== 0).map(s => Number(s)) } : {}),
                reposicionAplicada: formData.reposicion_aplicada ? 1 : 0,
            };
            const { data } = await api.post(url, payload);
            return data;
        } catch (error) { resolveError(error) }
    }

    static async list() {
        try {
            const url = ROUTES.LIST;
            const { data } = await api(url)
            const response = DashboardReturnsProductsSchema.safeParse(data)
            if (response.success) return response.data;
        } catch (error) { resolveError(error) }
    }

    static async find(id: number) {
        try {
            const url = `${ROUTES.FIND}/${id}`;
            const { data } = await api.get(url)
            const response = DashboardReturnProductByIdSchema.safeParse(data)
            if (response.success) return response.data;
        } catch (error) { resolveError(error) }
    }

    static async update(formData: ReturnProductFormData) {
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
