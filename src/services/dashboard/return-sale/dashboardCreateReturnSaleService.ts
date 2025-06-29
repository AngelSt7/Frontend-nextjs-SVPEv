import api from "@/src/axios/axios";
import { ReturnSaleFormData } from "@/src/types/dashboard/ReturnSaleTypes";
import { isAxiosError } from "axios";

export async function dashboardCreateReturnSaleService(formData: ReturnSaleFormData) {
    try {
        const url = '/devolucion-venta/registrar'
        const { data } = await api.post(url, {
            id_detalle_venta: formData.id_detalle_venta,
            id_usuario: 1,
            motivo: formData.motivo,
            cantidad: formData.productos.find(p => !isNaN(p.cantidad))?.cantidad ?? 1
        })
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}