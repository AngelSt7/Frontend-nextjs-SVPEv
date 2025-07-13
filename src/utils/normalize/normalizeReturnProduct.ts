import { ReturnProductFormData } from "@/src/types/dashboard/ReturnProductTypes";

export function normalizeReturnProduct(raw: ReturnProductFormData): ReturnProductFormData {
    return{
      ...raw,
      id_detalle_ingreso: raw.id_detalle_ingreso,
      reposicion_aplicada: raw.reposicion_aplicada
    }
}