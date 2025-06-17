import { mutateProps } from "@/src/types/commonTypes/commonTypes";
import { DashboardSale } from "@/src/types/dashboard/SaleTypes";

export const getRenderCell = <T,>(
  renderFn: (
    mutate: mutateProps,
    item: T,
    columnKey: React.Key,
    openModalEdit?: (id: number) => void,
    openDetailsModal?: () => void,
    setDetails?: (detail: DashboardSale['detallesVenta']) => void
  ) => React.ReactNode,
  mutate: mutateProps,
  openModalEdit?: (id: number) => void,
  openDetailsModal?: () => void,
  setDetails?: (detail: DashboardSale['detallesVenta']) => void
) => {
  return (item: T, columnKey: React.Key) =>
    renderFn(mutate, item, columnKey, openModalEdit, openDetailsModal, setDetails);
};
