import { z } from 'zod';
import { DashboardSubcategoriaSchema, DashboardSubcategoriasSchema } from '@/src/schemas/extras/subCategory/subCategory';

export type DashboardSubcategoria = z.infer<typeof DashboardSubcategoriaSchema>
export type DashboardSubcategorias = z.infer<typeof DashboardSubcategoriasSchema>