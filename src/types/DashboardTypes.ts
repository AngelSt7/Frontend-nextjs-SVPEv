import { z } from "zod";
import { DashboardProductSchema, DashboardProductsSchema, DashboardSupplierSchema, DashboardSuppliersSchema, SupplierByIdSchema, SupplierFormDataSchema } from "../schemas/dashboard/Suppliers";

export type DashboardPaginationType = { page: number, take: number }
export type DashboardSupplier = z.infer<typeof DashboardSupplierSchema>
export type SupplierFormData = z.infer<typeof SupplierFormDataSchema>
export type SupplierById = z.infer<typeof SupplierByIdSchema>
export type DashboardSuppliers = z.infer<typeof DashboardSuppliersSchema>
