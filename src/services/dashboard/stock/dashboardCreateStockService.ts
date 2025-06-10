import api from "@/src/axios/axios";
import { StockFormData } from "@/src/types/dashboard/Stocktypes";
import { isAxiosError } from "axios";

export async function dashboardCreateStockService(formData: StockFormData) {
    try {
        const url = '/ingresoStock/registrar'
        const { data } = await api.post(url, {
            ...formData,
            tipo_documento: formData.tipo_documento === 1 ? 'SERIE' : 'SIN_SERIE'
        })
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}