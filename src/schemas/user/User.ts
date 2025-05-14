import { z } from "zod";

export const DashboardUsuarioSchema = z.object({
  nombre: z.string(),
  apellido: z.string(),
  correo: z.string().email(),
  rol: z.string(),
  clave_cambiada: z.boolean(),
  activo: z.boolean()
});
