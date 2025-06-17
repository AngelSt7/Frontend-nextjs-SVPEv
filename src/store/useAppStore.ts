import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { paginationSlice, PaginationSlice } from "./paginationSlice";
import { ControlSessionSlice, controlSessionSlice } from "./controlSessionSlice";
import { cartSlice, CartSlice } from "./cartSlice";
import { controlSaleSlice, ControlSaleSlice } from "./controlSaleSlice";
import { detailsSaleSlice, DetailsSaleSlice } from './detailsSaleSlice';

export const useAppStore = create<PaginationSlice & ControlSessionSlice & CartSlice & ControlSaleSlice & ControlSaleSlice & DetailsSaleSlice>()(
    devtools(
        persist(
            (...a) => ({
                ...paginationSlice(...a),
                ...controlSessionSlice(...a),
                ...cartSlice(...a),
                ...controlSaleSlice(...a),
                ...detailsSaleSlice(...a),
            }),
            {
                name: "property-storage", 
                partialize: (state) => ({ 
                    take: state.take,
                    shouldShowResetPasswordModal: state.shouldShowResetPasswordModal,
                    showModal: state.showModal,
                    detail: state.detail
                }),
            }
        )
    )
);
