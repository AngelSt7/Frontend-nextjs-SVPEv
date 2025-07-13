import { z } from "zod";


const ProductSchema = z.object({
  id_producto: z.number(),
  cantidad: z.number(),
  precio_unitario: z.number(),
  tipo_serie: z.enum(['CON_SERIE', 'SIN_SERIE']),
  series_individuales: z.array(z.string()),
});

const ProductStockSchema = z.object({
  id: z.number(),
  nombre_producto: z.string(),
  modelo: z.string().nullable(),
  codigo_detalle: z.string(),
  cantidad: z.number(),
  precioUnitario: z.number(),
  subtotal: z.number(),
  tipo_serie: z.enum(['CON_SERIE', 'SIN_SERIE']),
  series_individuales: z.array(z.string()),
});

export const StockFormDataSchema = z.object({
  id: z.number(),
  id_proveedor: z.number(),
  tipo_documento: z.number(),
  numero_documento: z.string(),
  observaciones: z.string(),
  id_usuario: z.number(),
  productos: z.array(ProductSchema),
});

export const DashboardStockSchema = z.object({
  id: z.number(),
  codigo_ingreso: z.string(),
  fecha_ingreso: z.string(),
  numero_documento: z.string(),
  tipo_documento: z.string(),
  proveedor: z.string(),
  observaciones: z.string(),
  activo: z.number().min(0).max(1),
  total: z.number().nullish(),
});

export const DashboardStockByIdSchema = z.object({
  id: z.number(),
  id_proveedor: z.number(),
  proveedor: z.string(),
  codigo_ingreso: z.string(),
  fecha_ingreso: z.coerce.date(),
  tipo_documento: z.string(),
  numero_documento: z.string(),
  observaciones: z.string(),
  total: z.number(),
  detalles: z.array(ProductStockSchema),
});
export const DashboardStocksSchema = z.array(DashboardStockSchema);