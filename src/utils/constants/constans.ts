import { ChipProps } from "@heroui/react";

// Inversor de estados
export const actions: { [key: number]: { action: string } } = {
    1: { action: "desactivar" },
    0: { action: "activar" },
};

// Control de chip
export const statusColorMap: Record<string, ChipProps["color"]> = {
    activo: "success",
    inactivo: "danger",
};

