import api from "@/src/axios/axios";
import { DashboardCategoriesSchema, DashboardCategoryByIdSchema, DashboardLevelCategoriesSchema } from "@/src/schemas/dashboard/Category";
import { CategoryFormData } from "@/src/types/dashboard/CategoryTypes";
import { resolveError } from "@/src/utils/resolves/resolveError";
import { actions } from "@/src/utils/constants/constans";
import { ChangeStatus } from "@/src/utils/constants/changeStatus";

const ROUTES = {
    LIST: '/categoria/listar',
    LIST_LEVEL: '/categoria/listar/nivel',
    FIND: '/categoria/buscar',
    UPDATE: '/categoria/actualizar',
    CHANGE_STATUS: '/categoria',
    CREATE: '/categoria/registrar'
}

export class Category {

    static async create(formData: CategoryFormData) {
        try {
            const url = ROUTES.CREATE
            const { data } = await api.post(url, formData)
            return data
        } catch (error) { resolveError(error) }
    }

    static async list() {
        try {
            const url = ROUTES.LIST
            const { data } = await api(url)
            const response = DashboardCategoriesSchema.safeParse(data)
            if (response.success) return response.data
        } catch (error) { resolveError(error) }
    }

    static async listLevel({ level }: { level: number }) {
        try {
            const url = `${ROUTES.LIST_LEVEL}/${Number(level)}`
            const { data } = await api(url)
            const response = DashboardLevelCategoriesSchema.safeParse(data)
            if (response.success) return response.data
        } catch (error) { resolveError(error) }
    }

    static async find(id: number) {
        try {
            const url = `${ROUTES.FIND}/${id}`
            const { data } = await api.get(url)
            const response = DashboardCategoryByIdSchema.safeParse(data)
            if (response.success) return response.data
        } catch (error) { resolveError(error) }
    }

    static async update(formData: CategoryFormData) {
        try {
            const url = ROUTES.UPDATE
            const { data } = await api.put(url, formData)
            return data
        } catch (error) { resolveError(error) }
    }

    static async changeStatus(formdata: ChangeStatus) {
        try {
            const selected = actions[formdata.activo];
            const url = `${ROUTES.CHANGE_STATUS}/${selected.action}/${formdata.id}`;
            const { data } = await api.put(url);
            return data.mensaje
        } catch (error) { resolveError(error) }
    }

}