import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { paginationSlice, PaginationSlice } from "./paginationSlice";
import { ControlSessionSlice, controlSessionSlice } from "./controlSessionSlice";
import { cartSlice, CartSlice } from "./cartSlice";
import { controlSaleSlice, ControlSaleSlice } from "./controlSaleSlice";
import { detailsSaleSlice, DetailsSaleSlice } from './detailsSaleSlice';
import { DetailsReturnSaleSlice, detailsReturnSaleSlice } from "./detailsReturnSaleSlice";

export const useAppStore = create<PaginationSlice & ControlSessionSlice & CartSlice & ControlSaleSlice & ControlSaleSlice & DetailsSaleSlice & DetailsReturnSaleSlice>()(
    devtools(
        persist(
            (...a) => ({
                ...paginationSlice(...a),
                ...controlSessionSlice(...a),
                ...cartSlice(...a),
                ...controlSaleSlice(...a),
                ...detailsSaleSlice(...a),
                ...detailsReturnSaleSlice(...a)
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
