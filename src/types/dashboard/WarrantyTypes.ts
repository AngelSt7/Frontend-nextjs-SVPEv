import { z } from "zod";
import {
  DashboardWarrantySchema,
  WarrantyFormSchema,
  DashboardWarrantyByIdSchema,
  DashboardWarrantiesSchema
} from "../../schemas/dashboard/Warranty";

export type DashboardWarranty = z.infer<typeof DashboardWarrantySchema>;
export type WarrantyFormData = z.infer<typeof WarrantyFormSchema>;
export type DashboardWarrantyById = z.infer<typeof DashboardWarrantyByIdSchema>;
export type DashboardWarranties = z.infer<typeof DashboardWarrantiesSchema>;
