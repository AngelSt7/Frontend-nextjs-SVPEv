import { z } from "zod";

export const StockFormDataSchema = z.object({
  id_proveedor: z.number(),
  tipo_documento: z.number(),
  numero_documento: z.string(),
  observaciones: z.string(),
  cantidad_producto: z.number(),
  id_usuario: z.number(),
  id_producto: z.number(),
  precio_unitario: z.number(),
  tipo_serie: z.string(),
  series_individuales: z.array(z.string()).nullish(),
});

export const DashboardStockSchema = z.object({
  id: z.number(),
  producto: z.string(),
  proveedor: z.string(),
  lote: z.string(),
  tipo_documento: z.string(),
  numero_documento: z.string(),
  observaciones: z.string(),
  activo: z.number().min(0).max(1),
});

export const DashboardStockByIdSchema = z.object({
  id: z.number(),
  id_producto: z.number(),
  id_proveedor: z.number(),
  fecha_ingreso: z.string(),
  lote: z.string(),
  cantidad: z.number(),
  tipo_documento: z.string(),
  numero_documento: z.number(),
  observaciones: z.string(),
});

export const DashboardStocksSchema = z.array(DashboardStockSchema);