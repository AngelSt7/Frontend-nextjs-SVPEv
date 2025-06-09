import { z } from "zod";

export const DashboardReturnSchema = z.object({
    id: z.number(),
    proveedor: z.number(),
    producto: z.string(),
    lote: z.string(),
    cantidad: z.number(),
    fecha: z.string(),
    activo: z.number()
});

export const ReturnFormDataSchema = z.object({
    id_proveedor: z.number(),
    id_producto: z.number(),
    lote: z.string(),
    cantidad: z.number(),
    fecha: z.string(),
    activo: z.number()
});

export const DashboardReturnByIdSchema = ReturnFormDataSchema.extend({
    id: z.number()
});

export const DashboardReturnsSchema = z.array(DashboardReturnSchema);