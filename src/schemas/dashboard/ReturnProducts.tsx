import { z } from "zod";

export const DashboardReturnProductSchema = z.object({
  id_devolucion_producto: z.number(),
  codigo_lote: z.string(),
  cantidad: z.number(),
  fecha_devolucion: z.string(),
  motivo: z.string(),
  observaciones: z.string(),
  reposicion_aplicada: z.number(),
  estado: z.number()
}).transform((data) => ({
  ...data,
  id: data.id_devolucion_producto
}));

export const ReturnProductFormDataSchema = z.object({
    id_detalle_ingreso: z.number(),
    tipo_serie: z.string(),
    cantidad: z.number(),
    series: z.array(z.number()).optional(),
    motivo: z.string(),
    observaciones: z.string().optional(),
    id_usuario: z.number(),
    reposicionAplicada: z.number().min(0).max(1)
});

export const DashboardReturnProductByIdSchema = z.object({
  id_devolucion_producto: z.number(),
  codigo_lote: z.string(),
  cantidad: z.number(),
  fecha_devolucion: z.string(),
  motivo: z.string(),
  observaciones: z.string(),
  reposicion_aplicada: z.number(),
  estado: z.number()
}).transform((data) => ({
  ...data,
  id: data.id_devolucion_producto
}));

export const DashboardReturnsProductsSchema = z.array(DashboardReturnProductSchema);