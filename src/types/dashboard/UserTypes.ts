import { UserFormDataSchema, DashboardUserSchema, DashboardUserByIdSchema } from '@/src/schemas/dashboard/Users';
import { z } from 'zod';

export type UserFormData = z.infer<typeof UserFormDataSchema>
export type DashboardUser = z.infer<typeof DashboardUserSchema>
export type DashboardUserById = z.infer<typeof DashboardUserByIdSchema>