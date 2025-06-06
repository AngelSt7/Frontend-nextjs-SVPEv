//Asignar una ruta y el titulo de esta
// Ejemplo: "/usuarios" : "Administrar Usuarios"
export const Tittles: Record<string, string> = {
    '/dashboard/proveedores': 'Administrar Proveedores',
    '/dashboard/usuarios': 'Administrar Usuarios',
    '/dashboard/productos': 'Administrar Productos',
    '/dashboard/categorias': 'Administrar Categorias'
};

// Mapear entidades
type Entity = 'proveedor' | 'producto' | 'usuario' | 'categorias';

export const pluralToSingular: Record<string, Entity> = {
    proveedores: "proveedor",
    productos: "producto",
    usuarios: "usuario",
    categorias: "categorias"
};
