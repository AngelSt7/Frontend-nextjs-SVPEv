import { z } from 'zod';

export const DashboardSupplierSchema = z.object({
    id: z.number(),
    razon_social: z.string(),
    ruc: z.string(),
    direccion: z.string(),
    correo: z.string().email(),
    celular: z.string(),
    telefono: z.string().nullish(),
    activo: z.number().int().min(0).max(1)
});

export const SupplierFormDataSchema = z.object({
    id: z.number().nullish(),
    razon_social: z.string(),
    ruc: z.string(),
    direccion: z.string(),
    correo: z.string().email(),
    celular: z.string(),
    telefono: z.string().nullish(),
    activo: z.number()
})

export const DashboardProductSchema = z.object({
    id: z.number(),
    nombre: z.string(),
    stock: z.string(),
    precio: z.string(),
    activo: z.number()
});


export const SupplierByIdSchema = DashboardSupplierSchema.extend({})

export const DashboardSuppliersSchema = z.array(DashboardSupplierSchema);
