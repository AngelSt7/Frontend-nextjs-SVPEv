import { z } from "zod";

//ya no existen

export const DashboardSubcategoriaSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  activo: z.number(),
  nombre_categoria: z.string()
});

export const DashboardSubcategoriasSchema = z.object({
  content: z.array(DashboardSubcategoriaSchema),
});