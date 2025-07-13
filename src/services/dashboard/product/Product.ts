import api from "@/src/axios/axios";
import { resolveError } from "@/src/utils/resolves/resolveError";
import { actions } from "@/src/utils/constants/constans";
import { ChangeStatus } from "@/src/utils/constants/changeStatus";
import { ProductFormData } from "@/src/types/dashboard/ProductTypes";
import { DashboardProductByIdSchema, DashboardProductsSchema } from "@/src/schemas/dashboard/Products";

const ROUTES = {
    LIST: '/producto/listar',
    FIND: '/producto/buscar',
    UPDATE: '/producto/actualizar',
    CHANGE_STATUS: '/producto',
    CREATE: '/producto/registrar'
};

export class Product {

    static async create(formData: ProductFormData) {
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
            const response = DashboardProductsSchema.safeParse(data)
            if (response.success) return response.data;
        } catch (error) { resolveError(error) }
    }

    static async listToSales() {
        try {
            const url = ROUTES.LIST;
            const { data } = await api(url)
            const response = DashboardProductsSchema.safeParse(data)
            if (response.success) return response.data.filter(product => product.stock_actual > (product.min_stock + 5) && product.activo === 1)
        } catch (error) { resolveError(error) }
    }

    static async find(id: number) {
        try {
            const url = `${ROUTES.FIND}/${id}`;
            const { data } = await api.get(url)
            const response = DashboardProductByIdSchema.safeParse(data)
            if (response.success) return response.data;
        } catch (error) { resolveError(error) }
    }

    static async update(formData: ProductFormData) {
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
