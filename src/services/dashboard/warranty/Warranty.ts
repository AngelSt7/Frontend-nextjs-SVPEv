import api from "@/src/axios/axios";
import { resolveError } from "@/src/utils/resolves/resolveError";
import { actions } from "@/src/utils/constants/constans";
import { ChangeStatus } from "@/src/utils/constants/changeStatus";
import { WarrantyFormData } from "@/src/types/dashboard/WarrantyTypes";
import { DashboardWarrantiesSchema, DashboardWarrantyByIdSchema } from "@/src/schemas/dashboard/Warranty";

const ROUTES = {
    LIST: '/garantia/listar',
    FIND: '/garantia/buscar',
    UPDATE: '/garantia/actualizar',
    CHANGE_STATUS: '/garantia',
    CREATE: '/garantia/registrar'
};

export class Warranty {

    static async create(formData: WarrantyFormData) {
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
            const response = DashboardWarrantiesSchema.safeParse(data)
            if (response.success) return response.data;
        } catch (error) { resolveError(error) }
    }

    static async find(id: number) {
        try {
            const url = `${ROUTES.FIND}/${id}`;
            const { data } = await api.get(url)
            const response = DashboardWarrantyByIdSchema.safeParse(data)
            if (response.success) return response.data;
        } catch (error) { resolveError(error) }
    }

    static async update(formData: WarrantyFormData) {
        try {
            if (!formData.id_garantia) {
                throw new Error("El campo 'id_garantia' es obligatorio para actualizar una garantía.");
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
