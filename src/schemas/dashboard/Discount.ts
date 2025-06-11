import { z } from "zod";

export const DashboardDiscountSchema = z.object({
  id: z.number(),
  id_categoria: z.number(),
  porcentaje: z.number(),
  fechaInicio: z.coerce.date(),
  fechaFinal: z.coerce.date(),
  nombreCategoria: z.string().nullish(),
  activo: z.number().min(0).max(1),
});


// Para descuento
// Crear :
//  id_categoria,
//    Double porcentaje,
//   fecha_inicio,
//  fecha_fin

// Actualizar:
// Long Id_descuento, 
// Long id_categoria,
//    Double porcentaje,
//   fecha_inicio,
//  fecha_fin


export const DiscountFormDataSchema = z.object({
  id_categoria: z.number(),
  porcentaje: z.number(),
  fecha_inicio: z.string(),
  fecha_fin: z.string()
});

export const DashboardDiscountByIdSchema = z.object({
  id: z.number(),
  id_categoria: z.number(),
  nombreCategoria: z.string(),
  porcentaje: z.number(),
  fechaInicio: z.string(),
  fechaFinal: z.string(),
  activo: z.number()
});


export const DashboardDiscountsSchema = z.array(DashboardDiscountSchema);