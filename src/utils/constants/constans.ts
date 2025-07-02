import { ChipProps } from "@heroui/react";

export const actions: { [key: number]: { action: string } } = {
    1: { action: "desactivar" },
    0: { action: "activar" },
};

export const actionsSale: { [key: number]: { action: string } } = {
    1: { action: "cancelar" },
    0: { action: "activar" },
};

export const statusColorMap: Record<string, ChipProps["color"]> = {
    activo: "success",
    inactivo: "danger",
};

export const status = [
    { id: 1, label: 'Pendiente', activo: 1 },
    { id: 2, label: 'Aprobado', activo: 1 },
    { id: 3, label: 'Resuelto', activo: 1 },
    { id: 4, label: 'Rechazado', activo: 1 }
]

export const MIN_QUANTITY = 1
export const MAX_QUANTITY = 5