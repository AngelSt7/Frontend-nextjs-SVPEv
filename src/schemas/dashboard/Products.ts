import { z } from 'zod';

export const ProductFormDataSchema = z.object({
  nombre: z.string(),
  descripcion: z.string(),
  precio_venta: z.number(),
  min_stock: z.number(),
  max_stock: z.number(),
  garantia_meses: z.number(),
  id_usuario: z.number(),
  id_categoria: z.number(),
  id_marca: z.number(),
  activo: z.number(),
  modelo: z.string().nullish(),
  color: z.string().nullish()
});

export const DashboardProductSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  descripcion: z.string(),
  precio_venta: z.number(),
  min_stock: z.number(),
  max_stock: z.number(),
  stock_actual: z.number(),
  garantia_meses: z.number(),
  activo: z.number(),
  sku: z.string(),
  fecha_creacion: z.string(),
  nombre_categoria: z.string(),
  nombre_marca: z.string(),
});

export const DashboardProductByIdSchema = ProductFormDataSchema.extend({
  id: z.number(),
}).omit({ id_usuario: true });

// El conjunto de elementos del dashboard
export const DashboardProductsSchema = z.array(DashboardProductSchema)