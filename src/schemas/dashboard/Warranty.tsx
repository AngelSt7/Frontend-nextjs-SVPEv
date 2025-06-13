import { z } from "zod";

export const DashboardWarrantySchema = z.object({
  id_garantia: z.number(),
  producto: z.string(),
  cantidad: z.number(),
  inicioGarantia: z.string(),
  finGarantia: z.string(),
  activo: z.number(),
}).transform((data) => ({
  ...data,
  id: data.id_garantia,
}));

export const WarrantyFormSchema = z.object({
  id_garantia: z.number().optional(),
  id_detalle_venta: z.number(),
  inicio_garantia: z.string(),
  fin_garantia: z.string()
});

export const DashboardWarrantyByIdSchema = z.object({
  id_garantia: z.number(),
  id_detalle_venta: z.number(),
  producto: z.string(),
  cantidad: z.number(),
  fecha_creacion: z.string(),
  inicio_garantia: z.string(),
  fin_garantia: z.string(),
  activo: z.number(),
}).transform((data) => ({
  ...data,
  id: data.id_garantia,
}));

export const DashboardWarrantiesSchema = z.array(DashboardWarrantySchema);
