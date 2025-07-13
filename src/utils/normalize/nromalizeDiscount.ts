import { DashboardDiscountById, DiscountFormData } from "@/src/types/dashboard/DiscountTypes";

export function normalizeDiscount(raw: DashboardDiscountById): DiscountFormData {
    return {
        id: raw.id,
        id_categoria: raw.id_categoria,
        porcentaje: raw.porcentaje,
        fecha_inicio: raw.fecha_inicio,
        fecha_fin: raw.fecha_fin
    }
}