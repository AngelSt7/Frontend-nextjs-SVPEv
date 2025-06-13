import { StateCreator } from "zustand";
import { Discount, Product, ProductCart } from "../types/dashboard/SaleTypes";
import { puedeDecrementar, puedeIncrementar } from "../utils/resolves/sales";

export type CartSlice = {
    discounts: Discount[],
    cart: ProductCart[],
    addProduct: (product: Product) => void,
    deleteProduct: (id: Product['id']) => void,
    increaseQuantity: (id: Product['id']) => void,
    decreaseQuantity: (id: Product['id']) => void,
    formatProduct: (product: Product) => ProductCart,
    setDiscounts: (arrayDiscounts: Discount[]) => void,
}

export const cartSlice: StateCreator<CartSlice> = (set, get) => ({
    discounts: [] as Discount[],
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
        const updateCart = get().cart.map(product => {
            if (product.id === id && puedeIncrementar(product)) {
                const porcentaje = product.descuento / 100;
                const nuevaCantidad = product.cantidad + 1;
                return {
                    ...product,
                    cantidad: nuevaCantidad,
                    subtotal: product.precio_venta * nuevaCantidad * (1 - porcentaje),
                };
            }
            return product;
        });

        set(() => ({ cart: updateCart }));
    },

    decreaseQuantity: (id) => {
        const updateCart = get().cart.map(product => {
            if (product.id === id && puedeDecrementar(product)) {
                const porcentaje = product.descuento / 100;
                const nuevaCantidad = product.cantidad - 1;
                return {
                    ...product,
                    cantidad: nuevaCantidad,
                    subtotal: product.precio_venta * nuevaCantidad * (1 - porcentaje),
                };
            }
            return product;
        });

        set(() => ({ cart: updateCart }));
    },

    formatProduct: (product: Product): ProductCart => {
        const discount = get().discounts.find(discount =>
            discount.nombreCategoria === product.nombre_categoria
        )

        const porcentaje = discount ? discount.porcentaje / 100 : 0

        return {
            ...product,
            cantidad: 1,
            descuento: discount?.porcentaje ?? 0,
            subtotal: product.precio_venta * (1 - porcentaje),
        }
    },



    setDiscounts: (arrayDiscounts) => {
        set(() => ({ discounts: arrayDiscounts }))
    }
})