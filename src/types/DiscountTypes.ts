import { z } from "zod";
import { DashboardDiscountSchema, DashboardDiscountsSchema, DiscountFormDataSchema } from "../schemas/dashboard/Discount";

export type DashboardDiscount = z.infer<typeof DashboardDiscountSchema>;
export type DiscountFormData = z.infer<typeof DiscountFormDataSchema>;
export type DashboardDiscounts = z.infer<typeof DashboardDiscountsSchema>;