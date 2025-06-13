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
};

// Mapear entidades
type Entity = 'proveedor' | 'producto' | 'usuario' | 'categoria' | 'descuento' | 'cupón' | 'devolución_producto' | 'devolución_venta' | 'garantia' | 'reclamo_garantia' | 'stock';

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
};
