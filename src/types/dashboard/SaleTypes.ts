import { DashboardSaleSchema, SalesFormDataSchema } from "@/src/schemas/dashboard/Sales"
import { z } from "zod"

export type Discount = {
    nombreCategoria: string,
    porcentaje: number,
}

export type Product = {
    id: number,
    nombre: string,
    precio_venta: number,
    min_stock: number,
    stock_actual: number,
    nombre_categoria: string,
    nombre_marca: string,
}

export type ProductCart = Product & {
    cantidad: number,
    subtotal: number,
    descuento: number,
    igv: number
}

export type SalesFormData = z.infer<typeof SalesFormDataSchema>
export type DashboardSale = z.infer<typeof DashboardSaleSchema>