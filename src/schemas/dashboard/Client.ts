import { z } from "zod";

export const DashboardClientSchema = z.object({
  id: z.number().int(),
  nombre: z.string(),
  apellido: z.string(),
  dni: z.string(),
  celular: z.string(),
  correo: z.string().email(),
  activo: z.number().int().min(0).max(1)
});

export const ClientFormDataSchema = z.object({
  nombre: z.string(),
  apellido: z.string(),
  dni: z.string(),
  celular: z.string(),
  correo: z.string().email()
})

export const DashboardClientByIdSchema = DashboardClientSchema.extend({})

export const DashboardClientsSchema = z.array(DashboardClientSchema);