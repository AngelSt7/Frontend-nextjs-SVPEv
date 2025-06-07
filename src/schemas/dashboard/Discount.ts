import { z } from "zod";

export const DashboardDiscountSchema = z.object({
    id: z.number(),
    categoria: z.number(),
    descuento: z.number(),
    fecha_inicio: z.string(),
    fecha_final: z.string(),
    activo: z.number()
});