import { StateCreator } from "zustand";
import { DashboardSale } from "../types/dashboard/SaleTypes";

export type DetailsSaleSlice = {
    detail: DashboardSale['detallesVenta'];
    setDetails: (detail: DashboardSale['detallesVenta']) => void;
    clearDetails: () => void;
};

export const detailsSaleSlice: StateCreator<DetailsSaleSlice> = (set, get) => ({
    detail: [],
    setDetails: (detail) => { set(() => ({ detail })) },
    clearDetails: () => { set(() => ({ detail: [] })) },
})
