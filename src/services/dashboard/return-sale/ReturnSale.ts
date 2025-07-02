import api from "@/src/axios/axios";
import { DashboardCategoriesSchema, DashboardCategoryByIdSchema, DashboardLevelCategoriesSchema } from "@/src/schemas/dashboard/Category";
import { CategoryFormData } from "@/src/types/dashboard/CategoryTypes";
import { resolveError } from "@/src/utils/resolves/resolveError";
import { actions } from "@/src/utils/constants/constans";
import { ChangeStatus } from "@/src/utils/constants/changeStatus";
import { ReturnSaleFormData } from "@/src/types/dashboard/ReturnSaleTypes";

const ROUTES = {
    LIST: '/categoria/listar',
    LIST_LEVEL: '/categoria/listar/nivel',
    FIND: '/categoria/buscar',
    UPDATE: '/categoria/actualizar',
    CHANGE_STATUS: '/categoria',
    CREATE: '/devolucion-venta/registrar'
}

export class ReturnSale {
    static async create(formData: ReturnSaleFormData) {
        try {
            const url = ROUTES.CREATE
            const { data } = await api.post(url, formData)
            return data
        } catch (error) { resolveError(error) }
    }

}