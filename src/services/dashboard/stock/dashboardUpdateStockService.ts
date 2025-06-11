import api from "@/src/axios/axios";
import { StockFormData } from "@/src/types/dashboard/Stocktypes";
import { isAxiosError } from "axios";

type StockUpdateFormData = StockFormData & { id_ingreso: number };

export async function dashboardUpdateStockService(formData: StockUpdateFormData) {
    try {
        const url = '/ingresoStock/actualizar'
        const { data } = await api.put(url, {
            ...formData,
            id_ingreso: formData.id_ingreso, 
            tipo_documento: formData.tipo_documento === 1 ? 'FACTURA' : 'BOLETA'
        })
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}