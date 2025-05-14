import { z } from "zod";

export const DashboardMarcaSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  activo: z.number()
});

export const DashboardMarcasSchema = z.object({
  content: z.array(DashboardMarcaSchema),
});
