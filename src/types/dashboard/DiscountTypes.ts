import { z } from "zod";
import { DashboardDiscountByIdSchema, DashboardDiscountSchema, DashboardDiscountsSchema, DiscountFormDataSchema } from "@/src/schemas/dashboard/Discount";


export type DashboardDiscount = z.infer<typeof DashboardDiscountSchema>;
export type DiscountFormData = z.infer<typeof DiscountFormDataSchema>;
export type DashboardDiscountById = z.infer<typeof DashboardDiscountByIdSchema>;
export type DashboardDiscounts = z.infer<typeof DashboardDiscountsSchema>;