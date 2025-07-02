import { DashboardReturnSaleById } from "@/src/types/dashboard/ReturnSaleTypes";

export const resolveId = (defaultValues: DashboardReturnSaleById['estado']) => {
    switch (defaultValues) {
        case "PENDIENTE":
            return 1;
        case "APROBADO":
            return 2;
        case "RESUELTO":
            return 3;
        case "RECHAZADO":
            return 4;
        default:
            return 1;
    }
}

export const resolveStatus = (defaultValues: number) => {
    switch (defaultValues) {
        case 1:
            return "PENDIENTE";
        case 2:
            return "APROBADO";
        case 3:
            return "RESUELTO";
        case 4:
            return "RECHAZADO";
        default:
            return 1;
    }
}