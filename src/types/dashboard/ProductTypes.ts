import { z } from "zod"
import { ProductFormDataSchema, DashboardProductByIdSchema, DashboardProductSchema } from "@/src/schemas/dashboard/Products"


export type ProductFormData = z.infer<typeof ProductFormDataSchema>
export type DashboardProductById = z.infer<typeof DashboardProductByIdSchema>
export type DashboardProduct = z.infer<typeof DashboardProductSchema>
