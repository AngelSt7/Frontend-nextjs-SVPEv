import { z } from "zod";
import { DashboardReturnProductByIdSchema, DashboardReturnProductSchema, DashboardReturnsProductsSchema, ReturnProductFormDataSchema } from "@/src/schemas/dashboard/ReturnProducts";

export type DashboardReturnProduct = z.infer<typeof DashboardReturnProductSchema>;
export type ReturnProductFormData = z.infer<typeof ReturnProductFormDataSchema>;
export type DashboardReturnProductById = z.infer<typeof DashboardReturnProductByIdSchema>;
export type DashboardReturnsProducts = z.infer<typeof DashboardReturnsProductsSchema>;
