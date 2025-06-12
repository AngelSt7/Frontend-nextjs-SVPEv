import { StateCreator } from "zustand";
import { Product, ProductCart } from "../types/dashboard/SaleTypes";
import { puedeDecrementar, puedeIncrementar } from "../utils/resolves/sales";

export type CartSlice = {
    cart: ProductCart[],
    addProduct: (product: Product) => void,
    deleteProduct: (id: Product['id']) => void,
    increaseQuantity: (id: Product['id']) => void,
    decreaseQuantity: (id: Product['id']) => void,
    formatProduct: (product: Product) => ProductCart
}

export const cartSlice: StateCreator<CartSlice> = (set, get) => ({
    cart: [] as ProductCart[],
    addProduct: (product) => {
        const productInCart = get().cart.find(p => p.id === product.id);
        let updateCart: ProductCart[] = [];

        if (productInCart) {
            if (!puedeIncrementar(productInCart)) return;
            updateCart = get().cart.map(product => product.id === productInCart.id && puedeIncrementar(product)
                ? {
                    ...product,
                    cantidad: product.cantidad + 1,
                    subtotal: (product.cantidad + 1) * product.precio_venta,
                } : product
            )
        } else {
            updateCart = [...get().cart, get().formatProduct(product)];
        }

        set(() => ({ cart: updateCart }));
    },

    deleteProduct: (id) => {
        const updateCart = get().cart.filter(product => product.id !== id)
        set(() => ({
            cart: updateCart
        }))
    },
    increaseQuantity: (id) => {
        const updateCart = get().cart.map(product => product.id === id && puedeIncrementar(product)
            ? {
                ...product,
                cantidad: product.cantidad + 1,
                subtotal: (product.cantidad + 1) * product.precio_venta,
            } : product
        );

        set(() => ({ cart: updateCart }));
    },

    decreaseQuantity: (id) => {
        const updateCart = get().cart.map(product => product.id === id && puedeDecrementar(product)
            ? {
                ...product,
                cantidad: product.cantidad - 1,
                subtotal: (product.cantidad - 1) * product.precio_venta,
            }
            : product
        );

        set(() => ({ cart: updateCart }));
    },
    formatProduct: (product: Product): ProductCart => {
        return {
            ...product,
            cantidad: 1,
            subtotal: 1 * product.precio_venta,
        }
    }
})