import { z } from "zod";

export const DashboardCouponSchema = z.object({
    id: z.number(),
    categoria_aplicable: z.string(),
    codigo: z.string(),
    descuento: z.number(),
    fecha_inicio: z.string(),
    fecha_final: z.string(),
    activo: z.number()
});

export const CouponFormDataSchema = z.object({
    id_categoria: z.number(),
    codigo: z.string(),
    descuento: z.number(),
    fecha_inicio: z.string(),
    fecha_final: z.string(),
    activo: z.number()
});

export const DashboardCouponByIdSchema = DashboardCouponSchema.extend({});
export const DashboardCouponsSchema = z.array(DashboardCouponSchema);