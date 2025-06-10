//Asignar una ruta y el titulo de esta
// Ejemplo: "/usuarios" : "Administrar Usuarios"
export const Tittles: Record<string, string> = {
    '/dashboard/proveedores': 'Administrar Proveedores',
    '/dashboard/usuarios': 'Administrar Usuarios',
    '/dashboard/productos': 'Administrar Productos',
    '/dashboard/categorias': 'Administrar Categorias',
    '/dashboard/descuentos': 'Administrar Descuentos',
    '/dashboard/cupones': 'Administrar Cupones',
    '/dashboard/returns': 'Administrar Devoluciones',
};

// Mapear entidades
type Entity = 'proveedor' | 'producto' | 'usuario' | 'categoria' | 'descuento' | 'cupón' | 'devolución_producto' | 'stock';

// ruta => singular
export const pluralToSingular: Record<string, Entity> = {
    proveedores: "proveedor",
    productos: "producto",
    usuarios: "usuario",
    categorias: "categoria",
    descuentos: "descuento",
    cupones: "cupón",
    devoluciones_productos: "devolución_producto",
    stock: "stock"
};
