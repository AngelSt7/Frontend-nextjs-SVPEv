import { z } from "zod";
import { DashboardReturnSchema, ReturnFormDataSchema, DashboardReturnByIdSchema, DashboardReturnsSchema } from '../schemas/dashboard/Return';

export type DashboardReturn = z.infer<typeof DashboardReturnSchema>;
export type ReturnFormData = z.infer<typeof ReturnFormDataSchema>;
export type DashboardReturnById = z.infer<typeof DashboardReturnByIdSchema>;
export type DashboardReturns = z.infer<typeof DashboardReturnsSchema>;
