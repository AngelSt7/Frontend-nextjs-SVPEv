import { z } from "zod";

export const CategoryFormDataSchema = z.object({
    id_categoria_padre: z.number().positive().nullish(),
    nombre: z.string(),
    nivel: z.number(),
    activo: z.number()
});

export const DashboardCategorySchema = z.object({
    id: z.number().positive(),
    nombre: z.string(),
    activo: z.number(),
});

export const DashboardCategoryByIdSchema = DashboardCategorySchema.extend({
    id_padre: z.number().positive().nullish(),
    nivel: z.number()
});

export const DashboardCategoriesSchema = z.array(DashboardCategorySchema);
