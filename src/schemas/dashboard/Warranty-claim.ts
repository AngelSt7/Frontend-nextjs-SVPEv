import { z } from "zod";

export const DashboardWarrantyClaimSchema = z.object({
  id_reclamo_garantia: z.number(),
  inicio_garantia: z.string(),
  final_garantia: z.string(),
  descripcion: z.string(),
  estado: z.string(),
  activo: z.number(),
  fecha_reclamo: z.string()
}).transform((data) => ({
  ...data,
  id: data.id_reclamo_garantia
}));

export const WarrantyClaimFormSchema = z.object({
  id_reclamo_garantia: z.number().optional(),
  id_garantia: z.number(),
  descripcion: z.string(),
  estado: z.string().optional()
});

export const DashboardWarrantyClaimByIdSchema = z.object({
  id_reclamo_garantia: z.number(),
  id_garantia: z.number(),
  inicio_garantia: z.string(),
  final_garantia: z.string(),
  descripcion: z.string(),
  estado: z.string(),
  activo: z.number(),
  fecha_reclamo: z.string()
}).transform((data) => ({
  ...data,
  id: data.id_reclamo_garantia
}));

export const DashboardWarrantyClaimsSchema = z.array(DashboardWarrantyClaimSchema);