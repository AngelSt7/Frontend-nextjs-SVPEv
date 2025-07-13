import api from "@/src/axios/axios";
import { resolveError } from "@/src/utils/resolves/resolveError";
import { actions } from "@/src/utils/constants/constans";
import { ChangeStatus } from "@/src/utils/constants/changeStatus";
import { WarrantyClaimFormData } from "@/src/types/dashboard/WarrantyClaimTypes";
import { DashboardWarrantyClaimByIdSchema, DashboardWarrantyClaimsSchema } from "@/src/schemas/dashboard/Warranty-claim";

const ROUTES = {
    LIST: '/reclamo-garantia/listar',
    FIND: '/reclamo-garantia/buscar',
    UPDATE: '/reclamo-garantia/actualizar',
    CHANGE_STATUS: '/reclamo-garantia',
    CREATE: '/reclamo-garantia/registrar'
};

export class WarrantyClaim {

    static async create(formData: WarrantyClaimFormData) {
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
            const response = DashboardWarrantyClaimsSchema.safeParse(data)
            if (response.success) return response.data;
        } catch (error) { resolveError(error) }
    }

    static async find(id: number) {
        try {
            const url = `${ROUTES.FIND}/${id}`;
            const { data } = await api.get(url)
            const response = DashboardWarrantyClaimByIdSchema.safeParse(data)
            if (response.success) return response.data;
        } catch (error) { resolveError(error) }
    }

    static async update(formData: WarrantyClaimFormData) {
        try {
            if (!formData.id_reclamo_garantia) {
            throw new Error("El campo 'id_reclamo_garantia' es obligatorio para actualizar un reclamo.");
            }
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
