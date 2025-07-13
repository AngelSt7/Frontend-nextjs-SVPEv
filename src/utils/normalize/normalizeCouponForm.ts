import { CouponFormData, DashboardCuponById } from "@/src/types/dashboard/CouponTypes";

export function normalizeCoupon(raw: DashboardCuponById): CouponFormData {
  return {
    id: raw.id,
    codigo: raw.codigo,
    activo: raw.activo,
    fecha_inicio: raw.fechaInicio,
    fecha_fin: raw.fechaFin,
    tipo_descuento: raw.tipoDescuento === 'PORCENTAJE' ? 1 : 2,
    descuento_monto: raw.descuentoMonto,
    descuento_porcentaje: raw.descuentoPorcentaje,
    max_usos: raw.maxUsos
  }
}