import api from "@/src/axios/axios";
import { DashboardClientsSchema, DashboardClientByIdSchema } from "@/src/schemas/dashboard/Client";
import { ClientFormData } from "@/src/types/dashboard/ClientType";
import { resolveError } from "@/src/utils/resolves/resolveError";
import { actions } from "@/src/utils/constants/constans";
import { ChangeStatus } from "@/src/utils/constants/changeStatus";

const ROUTES = {
    LIST: '/cliente/listar',
    FIND: '/cliente/buscar',
    UPDATE: '/cliente/actualizar',
    CHANGE_STATUS: '/cliente',
    CREATE: '/cliente/registrar'
};

export class Client {

    static async create(formData: ClientFormData) {
        try {
            const url = ROUTES.CREATE;
            const { data } = await api.post(url, formData);
            return data;
        } catch (error) { resolveError(error) }
    }

    static async list() {
        try {
            const url = ROUTES.LIST;
            const { data } = await api(url);
            const response = DashboardClientsSchema.safeParse(data);
            if (response.success) return response.data;
        } catch (error) { resolveError(error) }
    }

    static async find(id: number) {
        try {
            const url = `${ROUTES.FIND}/${id}`;
            const { data } = await api.get(url);
            const response = DashboardClientByIdSchema.safeParse(data);
            if (response.success) return response.data;
        } catch (error) { resolveError(error) }
    }

    static async update(formData: ClientFormData) {
        try {
            const url = ROUTES.UPDATE;
            const { data } = await api.put(url, formData);
            return data;
        } catch (error) { resolveError(error) }
    }

    static async changeStatus(formdata: ChangeStatus) {
        try {
            const selected = actions[formdata.activo];
            const url = `${ROUTES.CHANGE_STATUS}/${selected.action}/${formdata.id}`;
            const { data } = await api.put(url);
            return data.mensaje;
        } catch (error) { resolveError(error) }
    }
}
