import { StateCreator } from "zustand";
import { DashboardPaginationType } from "../types/DashboardTypes";

export type PaginationSlice = {
    take: number;
    setChangeTake: (take: DashboardPaginationType['take']) => void;
};

export const paginationSlice: StateCreator<PaginationSlice> = (set, get) => ({
    take: 10,
    setChangeTake: (take) => { set(()=>({ take }))},
})
