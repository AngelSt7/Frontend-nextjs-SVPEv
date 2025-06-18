//Asignar una ruta y el titulo de esta
// Ejemplo: "/usuarios" : "Administrar Usuarios"
export const Tittles: Record<string, string> = {
    '/dashboard/proveedores': 'Administrar Proveedores',
    '/dashboard/usuarios': 'Administrar Usuarios',
    '/dashboard/productos': 'Administrar Productos',
    '/dashboard/categorias': 'Administrar Categorias',
    '/dashboard/descuentos': 'Administrar Descuentos',
    '/dashboard/cupones': 'Administrar Cupones',
    '/dashboard/devolucion-productos': 'Administrar Devoluciones',
    '/dashboard/stock': 'Administrar Stock',
    '/dashboard/ventas': 'Administrar Ventas',
    '/dashboard/ventas/registrar': 'Generar Venta',
    '/dashboard/returns-sales': 'Administrar Devoluciones de Ventas',
    '/dashboard/reclamos-garantia': 'Administrar Reclamos de Garantía',
    '/dashboard/garantia': 'Administrar Garantías',
    '/dashboard/clientes': 'Administrar Clientes',
    '/dashboard/devoluciones-productos': 'Administrar Devoluciones de Productos',
    '/dashboard/ayuda': 'Bienvenido al sistema de ayuda de NEON',
};

// Mapear entidades
type Entity = 'proveedor' | 'producto' | 'usuario' | 'categoria' | 'descuento' | 'cupón' | 'devolución_producto' | 'devolución_venta' | 'garantia' | 'reclamo_garantia' | 'stock' | 'cliente' | 'venta';

// ruta => singular
export const pluralToSingular: Record<string, Entity> = {
    proveedores: "proveedor",
    productos: "producto",
    usuarios: "usuario",
    categorias: "categoria",
    descuentos: "descuento",
    cupones: "cupón",
    devoluciones_productos: "devolución_producto",
    devoluciones_ventas: "devolución_venta",
    stock: "stock",
    reclamos_garantia: "reclamo_garantia",
    garantia: "garantia",
    clientes: "cliente",
    ventas: "venta",
};


export const labelMap: Record<string, string> = {
  suppliers: "Proveedor",
  users: "Usuario",
  products: "Producto",
  categories: "Categoria",
  discounts: "Descuento",
  coupons: "Cupón",
  returns: "Devolución",
  stocks: "Stock",
  returnsProducts: "Devolución Producto",
  sales: "Venta",
  warrantyClaims: "Reclamo de Garantía",
  warranties: "Garantía",
  clients: "Cliente",
};

export const entityLabelMap: Record<string, string> = {
  suppliers: "proveedores",
  users: "usuarios",
  products: "productos",
  categories: "categorías",
  discounts: "descuentos",
  coupons: "cupones",
  returnsProducts: "devoluciones de producto",
  stocks: "stocks",
  warrantyClaims: "reclamos de garantía",
  warranties: "garantías",
};