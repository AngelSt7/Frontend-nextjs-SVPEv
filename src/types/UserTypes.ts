import { z } from 'zod';
import { DashboardUsuarioSchema } from '../schemas/user/User';

export type DashboardUsuario = z.infer<typeof DashboardUsuarioSchema>