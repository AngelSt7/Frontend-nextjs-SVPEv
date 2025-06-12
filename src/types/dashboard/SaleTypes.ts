export type Product = {
    id: number,
    nombre: string,
    precio_venta: number,
    min_stock: number,
    stock_actual: number,
    nombre_categoria: string,
    nombre_marca: string
}

export type ProductCart = Product & {
    cantidad: number,
    subtotal: number,
}