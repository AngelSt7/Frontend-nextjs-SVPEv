import api from "@/src/axios/axios";
import { resolveError } from "@/src/utils/resolves/resolveError";
import { actions } from "@/src/utils/constants/constans";
import { ChangeStatus } from "@/src/utils/constants/changeStatus";
import { StockFormData } from "@/src/types/dashboard/StockTypes";
import { DashboardStockByIdSchema, DashboardStocksSchema } from "@/src/schemas/dashboard/Stock";
import { SupplierFormData } from "@/src/types/DashboardTypes";
import { DashboardSuppliersSchema, SupplierByIdSchema } from "@/src/schemas/dashboard/Suppliers";

const ROUTES = {
    LIST: '/proveedores/listar',
    FIND: '/proveedores/buscar',
    UPDATE: '/proveedores/actualizar',
    CHANGE_STATUS: '/proveedores',
    CREATE: '/proveedores/registrar'
};

export class Supplier {

    static async create(formData: SupplierFormData) {
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
            const response = DashboardSuppliersSchema.safeParse(data)
            if (response.success) return response.data;
        } catch (error) { resolveError(error) }
    }

    static async find(id: number) {
        try {
            const url = `${ROUTES.FIND}/${id}`;
            const { data } = await api.get(url)
            const response = SupplierByIdSchema.safeParse(data)
            if (response.success) return response.data;
        } catch (error) { resolveError(error) }
    }

    static async update(formData: SupplierFormData) {
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
