import { DashboardStockById, StockFormData } from "@/src/types/dashboard/StockTypes";

export function normalizeStockData(raw: DashboardStockById): Omit<StockFormData, 'id_usuario'> {
  return {
    id: raw.id,
    id_proveedor: raw.id_proveedor,
    tipo_documento: raw.tipo_documento.toLowerCase() == 'factura' || 'guía' ? 1 : 2,
    numero_documento: raw.numero_documento,
    observaciones: raw.observaciones,
    productos: raw.detalles.map(p => ({
      id_producto: p.id,
      cantidad: p.cantidad,
      precio_unitario: p.precioUnitario,
      tipo_serie: p.tipo_serie,
      series_individuales: p.series_individuales,
    }))
  }
}