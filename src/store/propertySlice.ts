import { StateCreator } from "zustand";
import { DashboardPaginationType } from "../types/DashboardTypes";

export type SupplierSlice = {
    take: number;
    setChangeTake: (take: DashboardPaginationType['take']) => void;
};


export const createSupplierSlice: StateCreator<SupplierSlice> = (set, get) => ({
    take: 10,
    setChangeTake: (take) => { set(()=>({ take }))},
})
