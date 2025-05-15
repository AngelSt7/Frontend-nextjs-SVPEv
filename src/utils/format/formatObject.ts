import { RenderCellProduct } from "@/src/components/dashboard/products/list/RenderCellProduct";
import { RenderCellSupplier } from "@/src/components/dashboard/suppliers/list/RenderCellSupplier";
import { RenderCellUser } from "@/src/components/dashboard/users/list/RenderCellUser";
import { mutateProps } from "@/src/types/commonTypes/commonTypes";
import { DashboardSupplier } from "@/src/types/DashboardTypes";
import { DashboardProduct } from "@/src/types/ProductTypes";
import { DashboardUser } from "@/src/types/UserTypes";

export function isDashboardSupplier(item: any): item is DashboardSupplier {
  return "razon_social" in item;
}

export function isDashboardProduct(item: any): item is DashboardProduct {
  return "nombre" in item;
}

export function isDashboardUser(item: any): item is DashboardUser {
  return "dni" in item;
}

export const renderMap: Record<
  string,
  (mutate: mutateProps, item: any, columnKey: React.Key, openModalEdit: (id: number) => void) => React.ReactNode
> = {
  suppliers: (mutate, item, columnKey, openModalEdit) =>
    isDashboardSupplier(item) ? RenderCellSupplier(mutate, item, columnKey, openModalEdit) : null,
  products: (mutate, item, columnKey, openModalEdit) =>
    isDashboardProduct(item) ? RenderCellProduct(mutate, item, columnKey, openModalEdit) : null,
  users: (mutate, item, columnKey, openModalEdit) =>
    isDashboardUser(item) ? RenderCellUser(mutate, item, columnKey, openModalEdit) : null,
};
