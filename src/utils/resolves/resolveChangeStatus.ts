
export const resolveChangeStatus = (activo: number, module: string) => {
    switch (module) {
        case 'suppliers':
            if(activo === 1){
                // llamar fucnion de desactivar proveedor
            } else {
                // llamar funcion de activar proveedor
            }
    }
    return status === 'Activo' ? 'Inactivo' : 'Activo'
}