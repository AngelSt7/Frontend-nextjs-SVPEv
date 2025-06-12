import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { paginationSlice, PaginationSlice } from "./paginationSlice";
import { ControlSessionSlice, controlSessionSlice } from "./controlSessionSlice";
import { cartSlice, CartSlice } from "./cartSlice";

//partialize para guardar take en localStorage 
export const useAppStore = create<PaginationSlice & ControlSessionSlice & CartSlice>()(
    devtools(
        persist(
            (...a) => ({
                ...paginationSlice(...a),
                ...controlSessionSlice(...a),
                ...cartSlice(...a)
            }),
            {
                name: "property-storage", 
                partialize: (state) => ({ 
                    take: state.take,
                    shouldShowResetPasswordModal: state.shouldShowResetPasswordModal
                }),
            }
        )
    )
);
