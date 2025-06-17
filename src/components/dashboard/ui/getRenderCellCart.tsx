import { Product } from "@/src/types/dashboard/SaleTypes";

export const getRenderCellCart = <T extends { id: number }>(
  renderFn: (
    item: T,
    columnKey: React.Key,
    addProduct: (product: Product) => void
  ) => React.ReactNode,
  addProduct: (product: Product) => void
) => {
  return (item: T, columnKey: React.Key) =>
    renderFn(item, columnKey, addProduct);
};
