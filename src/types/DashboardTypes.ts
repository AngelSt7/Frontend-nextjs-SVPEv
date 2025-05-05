import { z } from "zod";
import { CreateSupplierSchema, DashboardSupplierSchema, DashboardSuppliersSchema } from "../schemas/dashboard/Suppliers";


export type DashboardPaginationType = { page: number, take: number }
export type DashboardSupplier = z.infer<typeof DashboardSupplierSchema>

export type CreateSupplier = z.infer<typeof CreateSupplierSchema>


export type DashboardSuppliers = z.infer<typeof DashboardSuppliersSchema>
