import api from "@/src/axios/axios";
import { resolveError } from "@/src/utils/resolves/resolveError";
import { actions } from "@/src/utils/constants/constans";
import { ChangeStatus } from "@/src/utils/constants/changeStatus";
import { UserFormData } from "@/src/types/dashboard/UserTypes";
import { DashboardUserByIdSchema, DashboardUsersSchema } from "@/src/schemas/dashboard/Users";

const ROUTES = {
    LIST: '/empleado/listar',
    FIND: '/empleado/buscar',
    UPDATE: '/empleado/actualizar',
    CHANGE_STATUS: '/empleado',
    CREATE: '/autenticacion/registro'
};

export class User {

    static async create(formData: UserFormData) {
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
            const response = DashboardUsersSchema.safeParse(data)
            if (response.success) return response.data;
        } catch (error) { resolveError(error) }
    }

    static async find(id: number) {
        try {
            const url = `${ROUTES.FIND}/${id}`;
            const { data } = await api.get(url)
            const response = DashboardUserByIdSchema.safeParse(data)
            if (response.success) return response.data;
        } catch (error) { resolveError(error) }
    }

    static async update(formData: UserFormData) {
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
