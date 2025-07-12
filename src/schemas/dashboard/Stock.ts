import { z } from "zod";


const ProductSchema = z.object({
  id_producto: z.number(),
  cantidad: z.number().min(1, 'La cantidad debe ser mayor a 0'),
  precio_unitario: z.number().min(0.01, 'El precio debe ser mayor a 0'),
  tipo_serie: z.enum(['CON_SERIE', 'SIN_SERIE']),
  series_individuales: z.array(z.string()),
});


export const StockFormDataSchema = z.object({
  id_proveedor: z.number(),
  tipo_documento: z.enum(['FACTURA', 'BOLETA']),
  numero_documento: z.string(),
  observaciones: z.string(),
  id_usuario: z.number(),
  productos: z.array(ProductSchema).min(1, 'Debe seleccionar al menos un producto'),
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
  total: z.number(),
});

export const DashboardStockByIdSchema = z.object({
  id: z.number(),
  id_producto: z.number(),
  producto: z.string(),
  id_proveedor: z.number(),
  proveedor: z.string(),
  fecha_ingreso: z.coerce.date(),
  lote: z.string(),
  cantidad_producto: z.number(),
  tipo_documento: z.string(),
  numero_documento: z.string(),
  observaciones: z.string(),
  precio_unitario: z.number()
});

export const DashboardStocksSchema = z.array(DashboardStockSchema);