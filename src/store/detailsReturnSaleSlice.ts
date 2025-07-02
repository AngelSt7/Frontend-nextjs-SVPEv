import { StateCreator } from "zustand";
import { DashboardReturnSale } from "../types/dashboard/ReturnSaleTypes";

export type DetailsReturnSaleSlice = {
    detailReturn: DashboardReturnSale["detalles"];
    setReturnDetails: (detail: DashboardReturnSale['detalles']) => void;
    clearReturnDetails: () => void;
};

export const detailsReturnSaleSlice: StateCreator<DetailsReturnSaleSlice> = (set, get) => ({
    detailReturn: [],
    setReturnDetails: (detail) => { set(() => ({ detailReturn: detail })) },
    clearReturnDetails: () => { set(() => ({ detailReturn: [] })) },
})
