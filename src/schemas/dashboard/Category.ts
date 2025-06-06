import { z } from "zod";

export const CategoryFormDataSchema = z.object({
    nombre: z.string(),
    activo: z.number()
});

export const DashboardCategorySchema = z.object({
    id: z.number().positive(),
    nombre: z.string(),
    activo: z.number()
});

