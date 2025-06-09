import { z } from "zod";

export const DashboardDiscountSchema = z.object({
    id: z.number(),
    categoria: z.string(),
    descuento: z.number(),
    fecha_inicio: z.string(),
    fecha_final: z.string(),
    activo: z.number()
});

export const DiscountFormDataSchema = z.object({
    id_categoria: z.number(),
    descuento: z.number(),
    fecha_inicio: z.string(),
    fecha_final: z.string(),
    activo: z.number()
});

export const DashboardDiscountByIdSchema = DashboardDiscountSchema.extend({});
export const DashboardDiscountsSchema = z.array(DashboardDiscountSchema);