import { z } from "zod";
import { CategoryFormDataSchema, DashboardCategorySchema } from "../schemas/dashboard/Category";

export type CategoryFormData = z.infer<typeof CategoryFormDataSchema>;
export type DashboardCategory = z.infer<typeof DashboardCategorySchema>;