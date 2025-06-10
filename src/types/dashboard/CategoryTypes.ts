import { z } from "zod";

import { CategoryFormDataSchema, DashboardCategoryByIdSchema, DashboardCategorySchema } from "@/src/schemas/dashboard/Category";

export type CategoryFormData = z.infer<typeof CategoryFormDataSchema>;
export type DashboardCategoryById = z.infer<typeof DashboardCategoryByIdSchema>;
export type DashboardCategory = z.infer<typeof DashboardCategorySchema>;