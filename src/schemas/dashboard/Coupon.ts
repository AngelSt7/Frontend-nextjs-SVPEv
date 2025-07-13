import { z } from "zod";

export const DashboardCouponSchema = z.object({
  id: z.number(),
  codigo: z.string(),
  tipoDescuento: z.enum(['PORCENTAJE', 'MONTO']),
  descuentoPorcentaje: z.number().nullable(),
  descuentoMonto: z.number().nullable(),
  fechaFin: z.string(),
  usosActuales: z.number(),
  maxUsos: z.number(),
  activo: z.number(),
});


export const CouponFormDataSchema = z.object({
  id: z.number().nullish(),
  codigo: z.string(),
  descuento_monto: z.number().nullish(),
  descuento_porcentaje: z.number().nullish(),
  fecha_inicio: z.string(),
  fecha_fin: z.string(),
  tipo_descuento: z.number(),
  max_usos: z.number(),
  activo: z.number()
});

export const DashboardCouponByIdSchema = z.object({
  id: z.number(),
  codigo: z.string(),
  descripcion: z.string().nullable(),
  tipoDescuento: z.enum(["PORCENTAJE", "MONTO"]),
  descuentoPorcentaje: z.number().nullable(),
  descuentoMonto: z.number().nullable(),
  fechaInicio: z.string(),
  fechaFin: z.string(),
  maxUsos: z.number(),
  usosActuales: z.number(), 
  activo: z.number().min(0).max(1), 
});


export const DashboardCouponsSchema = z.array(DashboardCouponSchema);