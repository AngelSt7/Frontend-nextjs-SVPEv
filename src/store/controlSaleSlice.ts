import { StateCreator } from "zustand";

export type ControlSaleSlice = {
    showModal: boolean;
    toggleShowModal: () => void;
};

export const controlSaleSlice: StateCreator<ControlSaleSlice> = (set, get) => ({
    showModal: false,
    toggleShowModal: () => { set(() => ({ showModal: !get().showModal })) }
})
