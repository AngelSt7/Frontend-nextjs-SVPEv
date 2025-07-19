import api from "@/src/axios/axios";
import { resolveError } from "@/src/utils/resolves/resolveError";
import { actions } from "@/src/utils/constants/constans";
import { ChangeStatus } from "@/src/utils/constants/changeStatus";
import { StockFormData } from "@/src/types/dashboard/StockTypes";
import { DashboardStockByIdSchema, DashboardStocksSchema } from "@/src/schemas/dashboard/Stock";

const ROUTES = {
    LIST: '/ingresoStock/listar',
    FIND: '/ingresoStock/buscar',
    UPDATE: '/ingresoStock/actualizar',
    CHANGE_STATUS: '/ingresoStock',
    CREATE: '/ingresoStock/registrar'
};

export class Stock {

    static async create(formData: StockFormData) {
        try {
            const url = ROUTES.CREATE;
            const { data } = await api.post(url, {
                ...formData,
                tipo_documento: Stock.resolveDocumentType(formData.tipo_documento),
            })
            return data;
        } catch (error) { resolveError(error) }
    }

    static async list() {
        try {
            const url = ROUTES.LIST;
            const { data } = await api(url)
            const response = DashboardStocksSchema.safeParse(data)
            if (response.success) return response.data;
        } catch (error) { resolveError(error) }
    }

    static async find(id: number) {
        try {
            const url = `${ROUTES.FIND}/${id}`;
            const { data } = await api.get(url)
            const response = DashboardStockByIdSchema.safeParse(data)
            if (response.success) return response.data;
        } catch (error) { resolveError(error) }
    }

    static async update(formData: StockFormData & { id_ingreso: number }) {
        try {
            const url = ROUTES.UPDATE;
            const { data } = await api.put(url, {
                ...formData,
                tipo_documento: Stock.resolveDocumentType(formData.tipo_documento),
                detalles: formData.productos.map(p => ({
                    ...p,
                    id_detalle: p.id_producto,
                    series: p.series_individuales
                }))

            })
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

    static resolveDocumentType(documentType: number) {
        switch (documentType) {
            case 1: return 'FACTURA';
            case 2: return 'BOLETA';
            case 3: return 'GUIA';
        }
    }

}
