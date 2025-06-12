import { ChipProps } from "@heroui/react";

export const actions: { [key: number]: { action: string } } = {
    1: { action: "desactivar" },
    0: { action: "activar" },
};


export const statusColorMap: Record<string, ChipProps["color"]> = {
    activo: "success",
    inactivo: "danger",
};

export const MIN_QUANTITY = 1
export const MAX_QUANTITY = 5