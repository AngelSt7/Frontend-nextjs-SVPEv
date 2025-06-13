import { StateCreator } from "zustand";

export type ExtrasSlice = {
  idReturnSaleDetail: number | null;
  setIdReturnSaleDetail: (id: number) => void;
  clearIdReturnSaleDetail: () => void;
};

export const extrasSlice: StateCreator<ExtrasSlice> = (set, get) => ({
  idReturnSaleDetail: null,
  setIdReturnSaleDetail: (id) => set(() => ({ idReturnSaleDetail: id })),
  clearIdReturnSaleDetail: () => set(() => ({ idReturnSaleDetail: null })),
});