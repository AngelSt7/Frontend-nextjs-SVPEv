import { z } from "zod";

export const UserFormDataSchema = z.object({
  id: z.number().nullish(),
  nombre: z.string(),
  apellido: z.string(),
  dni: z.string(),
  correo: z.string(),
  celular: z.string().min(9).max(15),
  activo: z.boolean(),
  id_rol: z.number().int().min(1),
  estado: z.number().int().min(0).max(1),
});


export const DashboardUserSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  apellido: z.string(),
  dni: z.string(),
  correo: z.string(),
  celular: z.string(),
  activo: z.number(),
});


export const DashboardUserByIdSchema = DashboardUserSchema.extend({})

export const DashboardUsersSchema = z.array(DashboardUserSchema)
