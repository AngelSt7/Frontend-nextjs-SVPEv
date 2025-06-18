import { StateCreator } from "zustand";
import { Discount, Product, ProductCart } from "../types/dashboard/SaleTypes";
import { puedeDecrementar, puedeIncrementar } from "../utils/resolves/sales";

export type CartSlice = {
  discounts: Discount[],
  cart: ProductCart[],
  clearCart: () => void,
  addProduct: (product: Product) => void,
  deleteProduct: (id: Product['id']) => void,
  increaseQuantity: (id: Product['id']) => void,
  decreaseQuantity: (id: Product['id']) => void,
  formatProduct: (product: Product) => ProductCart,
  setDiscounts: (arrayDiscounts: Discount[]) => void,
}

export const cartSlice: StateCreator<CartSlice> = (set, get) => ({
  discounts: [],
  cart: [],
  addProduct: (product) => {
    const productInCart = get().cart.find(p => p.id === product.id);
    let updateCart: ProductCart[] = [];

    if (productInCart) {
      if (!puedeIncrementar(productInCart)) return;

      const newQuantity = productInCart.cantidad + 1;
      const newSubtotal = productInCart.precio_descuento * newQuantity;
      const newIgv = productInCart.igv_unitario * newQuantity;

      updateCart = get().cart.map(p =>
        p.id === product.id
          ? {
            ...p,
            cantidad: newQuantity,
            subtotal: newSubtotal,
            igv: newIgv,
          }
          : p
      );
    } else {
      updateCart = [...get().cart, get().formatProduct(product)];
    }

    set(() => ({ cart: updateCart }));
  },

  deleteProduct: (id) => {
    const updateCart = get().cart.filter(product => product.id !== id);
    set(() => ({ cart: updateCart }));
  },

  increaseQuantity: (id) => {
    const updateCart = get().cart.map(product => {
      if (product.id === id && puedeIncrementar(product)) {
        const newQuantity = product.cantidad + 1;
        return {
          ...product,
          cantidad: newQuantity,
          subtotal: product.precio_descuento * newQuantity,
          igv: product.igv_unitario * newQuantity,
        };
      }
      return product;
    });

    set(() => ({ cart: updateCart }));
  },

  decreaseQuantity: (id) => {
    const updateCart = get().cart.map(product => {
      if (product.id === id && puedeDecrementar(product)) {
        const newQuantity = product.cantidad - 1;
        return {
          ...product,
          cantidad: newQuantity,
          subtotal: product.precio_descuento * newQuantity,
          igv: product.igv_unitario * newQuantity,
        };
      }
      return product;
    });

    set(() => ({ cart: updateCart }));
  },

  formatProduct: (product: Product): ProductCart => {
    const discount = get().discounts.find(
      d => d.nombreCategoria === product.nombre_categoria
    );
    const porcentaje = discount ? discount.porcentaje / 100 : 0;

    const precio_base = product.precio_venta / 1.18;
    const precio_descuento = precio_base * (1 - porcentaje);
    const igv_unitario = precio_descuento * 0.18;

    return {
      ...product,
      cantidad: 1,
      precio_venta: product.precio_venta,
      precio_base,
      precio_descuento,
      igv_unitario,
      subtotal: precio_descuento,
      igv: igv_unitario,
      descuento: discount?.porcentaje ?? 0,
    };
  },
  setDiscounts: (arrayDiscounts) => {
    set(() => ({ discounts: arrayDiscounts }));
  },
  clearCart: () => {
    set(() => ({ cart: [] }));
  }
});
