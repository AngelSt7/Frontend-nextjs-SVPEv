import { z } from "zod"
import { DashboardProductByIdSchema, DashboardProductSchema, ProductFormDataSchema } from "../schemas/dashboard/Products"

export type ProductFormData = z.infer<typeof ProductFormDataSchema>
export type DashboardProductById = z.infer<typeof DashboardProductByIdSchema>
export type DashboardProduct = z.infer<typeof DashboardProductSchema>
