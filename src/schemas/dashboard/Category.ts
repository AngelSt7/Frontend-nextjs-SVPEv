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

export const DashboardCategoryByIdSchema = z.object({
    id: z.number().positive(),
    nombre: z.string(),
    activo: z.number(),
    id_padre: z.number().min(-1),
    nivel: z.number()
})


export const DashboardLevelCategorySchema = z.object({
    id: z.number().positive(),
    nombre: z.string(),
    id_padre: z.number().min(-1),
    activo: z.number()
});

export const DashboardLevelCategoriesSchema = z.array(DashboardLevelCategorySchema);

export const DashboardCategoriesSchema = z.array(DashboardCategorySchema);
