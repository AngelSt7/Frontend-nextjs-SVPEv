import { z } from 'zod';
import { DashboardUserByIdSchema, DashboardUserSchema, UserFormDataSchema } from '../schemas/dashboard/Users';

export type UserFormData = z.infer<typeof UserFormDataSchema>
export type DashboardUser = z.infer<typeof DashboardUserSchema>
export type DashboardUserById = z.infer<typeof DashboardUserByIdSchema>