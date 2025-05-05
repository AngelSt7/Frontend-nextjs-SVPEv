import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { createSupplierSlice, SupplierSlice } from "./propertySlice";

//partialize para guardar take en localStorage 

export const useAppStore = create<SupplierSlice>()(
    devtools(
        persist(
            (...a) => ({
                ...createSupplierSlice(...a),
            }),
            {
                name: "property-storage", 
                partialize: (state) => ({ 
                    take: state.take
                }),
            }
        )
    )
);
