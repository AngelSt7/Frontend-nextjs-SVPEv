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
  discounts: [],
  cart: [],

  addProduct: (product) => {
    const productInCart = get().cart.find(p => p.id === product.id);
    let updateCart: ProductCart[] = [];

    const precioVentaSinIGV = product.precio_venta * 0.82;
    const igvUnitario = product.precio_venta * 0.18;

    if (productInCart) {
      if (!puedeIncrementar(productInCart)) return;

      const newQuantity = productInCart.cantidad + 1;
      const descuento = productInCart.descuento / 100;
      updateCart = get().cart.map(p =>
        p.id === product.id
          ? {
            ...p,
            cantidad: newQuantity,
            subtotal: precioVentaSinIGV * newQuantity * (1 - descuento),
            igv: igvUnitario * newQuantity
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
        const descuento = product.descuento / 100;
        const igvUnitario = (product.precio_venta / 0.82) * 0.18;

        return {
          ...product,
          cantidad: newQuantity,
          subtotal: product.precio_venta * newQuantity * (1 - descuento),
          igv: igvUnitario * newQuantity // ✅ ahora sí correcto
        };
      }
      return product;
    });

    set(() => ({ cart: updateCart }));
  }
  ,

  decreaseQuantity: (id) => {
    const updateCart = get().cart.map(product => {
      if (product.id === id && puedeDecrementar(product)) {
        const newQuantity = product.cantidad - 1;
        const descuento = product.descuento / 100;
        const igvUnitario = (product.precio_venta / 0.82) * 0.18;

        return {
          ...product,
          cantidad: newQuantity,
          subtotal: product.precio_venta * newQuantity * (1 - descuento),
          igv: igvUnitario * newQuantity
        };
      }
      return product;
    });

    set(() => ({ cart: updateCart }));
  },
  formatProduct: (product: Product): ProductCart => {
    const discount = get().discounts.find(discount =>
      discount.nombreCategoria === product.nombre_categoria
    );

    const porcentaje = discount ? discount.porcentaje / 100 : 0;
    const precioVentaSinIGV = product.precio_venta * 0.82;
    const igvUnitario = product.precio_venta * 0.18;

    return {
      ...product,
      cantidad: 1,
      precio_venta: precioVentaSinIGV,
      descuento: discount?.porcentaje ?? 0,
      subtotal: precioVentaSinIGV * (1 - porcentaje),
      igv: igvUnitario
    };
  },

  setDiscounts: (arrayDiscounts) => {
    set(() => ({ discounts: arrayDiscounts }));
  }
});
