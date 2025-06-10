import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { paginationSlice, PaginationSlice } from "./paginationSlice";
import { ControlSessionSlice, controlSessionSlice } from "./controlSessionSlice";
import { ExtrasSlice, extrasSlice } from "./extrasSlice";

//partialize para guardar take en localStorage 
export const useAppStore = create<PaginationSlice & ControlSessionSlice & ExtrasSlice>()(
    devtools(
        persist(
            (...a) => ({
                ...paginationSlice(...a),
                ...controlSessionSlice(...a),
                ...extrasSlice(...a)
            }),
            {
                name: "property-storage", 
                partialize: (state) => ({ 
                    take: state.take,
                    shouldShowResetPasswordModal: state.shouldShowResetPasswordModal,
                    idReturnProduct: state.idReturnProduct
                }),
            }
        )
    )
);
