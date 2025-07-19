import { DashboardStockById, StockFormData } from "@/src/types/dashboard/StockTypes";

const resolveDocId = (doc: string) : number => {
  switch (doc.toLowerCase()) {
    case 'factura': return 1
    case 'boleta': return 2
    case 'guia': return 3
    default: return 1
  }
}

export function normalizeStockData(raw: DashboardStockById): Omit<StockFormData, 'id_usuario'> {
  return {
    id: raw.id,
    id_proveedor: raw.id_proveedor,
    tipo_documento: resolveDocId(raw.tipo_documento),
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