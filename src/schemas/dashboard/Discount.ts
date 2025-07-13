import { z } from "zod";

export const DashboardDiscountSchema = z.object({
  id: z.number(),
  id_categoria: z.number().nullish(),
  porcentaje: z.number(),
  fecha_inicio: z.coerce.date(),
  fecha_fin: z.coerce.date(),
  nombreCategoria: z.string().nullish(),
  activo: z.number().min(0).max(1),
});

export const DiscountFormDataSchema = z.object({
  id: z.number().nullish(),
  id_categoria: z.number(),
  porcentaje: z.number(),
  fecha_inicio: z.string(),
  fecha_fin: z.string()
});

export const DashboardDiscountByIdSchema = z.object({
  id: z.number(),
  id_categoria: z.number(),
  nombreCategoria: z.string(),
  porcentaje: z.number(),
  fecha_inicio: z.string(),
  fecha_fin: z.string(),
  activo: z.number()
});


export const DashboardDiscountsSchema = z.array(DashboardDiscountSchema);