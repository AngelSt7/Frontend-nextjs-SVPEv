import { z } from 'zod';

export const DashboardSupplierSchema = z.object({
    id: z.number(),
    nombre: z.string(),
    apellido: z.string(),
    correo: z.string().email(),
    dni: z.string(),
    celular: z.string(),
    activo: z.boolean(),
    area: z.number()
})

export const CreateSupplierSchema = z.object({
    nombre: z.string(),
    apellido: z.string(),
    correo: z.string().email(),
    dni: z.string(),
    celular: z.string(),
    id_categoria: z.string(),
    ruc: z.string()
})

export const DashboardSuppliersSchema = z.object({
    empleados: z.array(DashboardSupplierSchema),
    pages: z.number()
})