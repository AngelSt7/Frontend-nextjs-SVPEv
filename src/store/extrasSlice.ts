import { StateCreator } from "zustand";

export type ExtrasSlice = {
    idReturnProduct: number | null,
    setIdReturnProduct: (id: number) => void
    clearIdReturnProduct: () => void
};

export const extrasSlice: StateCreator<ExtrasSlice> = (set, get) => ({
    idReturnProduct: null,
    setIdReturnProduct: (id) => { set(()=>({ idReturnProduct: id }))},
    clearIdReturnProduct: () => { set(()=>({ idReturnProduct: null }))},
})
