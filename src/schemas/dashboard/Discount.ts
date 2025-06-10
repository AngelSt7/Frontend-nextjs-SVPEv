import { z } from "zod";

export const DashboardDiscountSchema = z.object({
  id: z.number(),
  categoria: z.string().nullish(),
  porcentaje: z.number(),
  fecha_inicio: z.coerce.date(),
  fecha_final: z.coerce.date(),
  nombreCategoria: z.string().nullish(),
  activo: z.boolean(),
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
  nombreCategoria: z.string(),
  porcentaje: z.number(),
  fecha_inicio: z.string(),
  fecha_final: z.string(),
  activo: z.boolean(),
})
export const DashboardDiscountsSchema = z.array(DashboardDiscountSchema);