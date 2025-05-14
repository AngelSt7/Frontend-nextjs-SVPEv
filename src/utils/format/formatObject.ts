import { DashboardSupplier } from "@/src/types/DashboardTypes";
import { DashboardProduct } from "@/src/types/ProductTypes";

export function isDashboardSupplier(item: any): item is DashboardSupplier {
  return "razon_social" in item;
}

export function isDashboardProduct(item: any): item is DashboardProduct {
  return "nombre" in item;
}