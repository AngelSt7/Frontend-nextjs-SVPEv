import api from "@/src/axios/axios";
import { StockFormData } from "@/src/types/dashboard/StockTypes";
import { isAxiosError } from "axios";

type StockUpdateFormData = StockFormData & { id_ingreso: number };

export async function dashboardUpdateStockService(formData: StockUpdateFormData) {
    try {
        const url = '/ingresoStock/actualizar'
        const { data } = await api.put(url, {
            ...formData,
            detalles: formData.productos.map(p => ({
                ...p,
                id_detalle: p.id_producto,
                series: p.series_individuales
            }))
            
        })
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}