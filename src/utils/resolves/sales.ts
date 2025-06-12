import { ProductCart } from "@/src/types/dashboard/SaleTypes";
import { MAX_QUANTITY, MIN_QUANTITY } from "../constants/constans";

export const puedeIncrementar = (product: ProductCart): boolean => product.cantidad < MAX_QUANTITY && product.cantidad < product.stock_actual;
export const puedeDecrementar = (product: ProductCart): boolean => product.cantidad > MIN_QUANTITY;
