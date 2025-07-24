import api from "@/src/axios/axios";
import { resolveError } from "@/src/utils/resolves/resolveError";
import { ReturnSaleFormData } from "@/src/types/dashboard/ReturnSaleTypes";
import { DashboardReturnSaleByIdSchema, DashboardReturnsSalesSchema } from "@/src/schemas/dashboard/Return-sale";
import { resolveStatus } from "@/src/utils/resolves/resolveChangeStatus";

const ROUTES = {
    LIST: '/devolucion-venta/listar',
    FIND: '/devolucion-venta/buscar',
    UPDATE: '/devolucion-venta/actualizar',
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

    static async list() {
        try {
            const url = ROUTES.LIST
            const { data } = await api(url)
            const response = DashboardReturnsSalesSchema.safeParse(data)
            if (response.success) {
                return response.data
            }
        } catch (error) { resolveError(error) }
    }

    static async find(id: number) {
        try {
            const url = `${ROUTES.FIND}/${id}`
            const { data } = await api.get(url)
            const response = DashboardReturnSaleByIdSchema.safeParse(data)
            if (response.success) return response.data
        } catch (error) { resolveError(error) }
    }

    static async update(formData: ReturnSaleFormData) {
        try {
            const url = ROUTES.UPDATE
            const { data } = await api.put(url, formData)
            return data
        } catch (error) { resolveError(error) }
    }

    static async changeStatus(formData: { id: number, status: number }) {
        try {
            const url = ROUTES.UPDATE
            const { data } = await api.put(url, { id: formData.id, estado: resolveStatus(formData.status) })
            console.log(data)
            return data
        } catch (error) { resolveError(error) }
    }

}