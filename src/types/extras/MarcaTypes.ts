import { z } from 'zod';
import { DashboardMarcaSchema, DashboardMarcasSchema } from '@/src/schemas/extras/subCategory/marca';

export type DashboardMarca = z.infer<typeof DashboardMarcaSchema>
export type DashboardMarcas = z.infer<typeof DashboardMarcasSchema>