import { z } from "zod";

export const DashboardReturnSaleSchema = z.object({
  id: z.number(),
  totalVenta: z.number(),
  fecha: z.string(),
  cantidad: z.number(),
  motivo: z.string(),
  correoUsuario: z.string(),
});

export const ReturnSaleFormDataSchema = z.object({
  id_detalle: z.number(),
  cantidad: z.number(),
  motivo: z.string(),
  id_usuario: z.number(),
});

export const DashboardReturnSaleByIdSchema = z.object({
  id: z.number(),
  totalVenta: z.number(),
  fecha: z.string(),
  cantidad: z.number(),
  motivo: z.string().optional(),
  correoUsuario: z.string()
});

export const DashboardReturnsSalesSchema = z.array(DashboardReturnSaleSchema);