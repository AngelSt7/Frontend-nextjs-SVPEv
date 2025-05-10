import { StateCreator } from "zustand";

export type ControlSessionSlice = {
    shouldShowResetPasswordModal: boolean;
    toggleResetPasswordModal: () => void;
};

export const controlSessionSlice: StateCreator<ControlSessionSlice> = (set, get) => ({
    shouldShowResetPasswordModal: false,
    toggleResetPasswordModal: () => { set(()=>({ shouldShowResetPasswordModal: !get().shouldShowResetPasswordModal }))},
})
