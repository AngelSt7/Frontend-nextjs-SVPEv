import { DashboardUserById, UserFormData } from "@/src/types/dashboard/UserTypes";

export function normalizeUser(raw: DashboardUserById): UserFormData {
    return {
        id: raw.id,
        nombre: raw.nombre,
        apellido: raw.apellido,
        correo: raw.correo,
        activo: raw.activo === 1 ? true : false,
        dni: raw.dni,
        celular: raw.celular,
        id_rol: 1,
        estado: 1
    }
}