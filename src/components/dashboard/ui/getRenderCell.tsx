import { mutateProps } from "@/src/types/commonTypes/commonTypes";

export const getRenderCell = <T,>(
  renderFn: (
    mutate: any,
    item: T,
    columnKey: React.Key,
    openModalEdit?: (id: number) => void,
    openDetailsModal?: () => void,
    setDetails?: (detail: any) => void,
    openModalStatus?: (id: number) => void,
  ) => React.ReactNode,
  mutate: any ,
  openModalEdit?: (id: number) => void,
  openDetailsModal?: () => void,
  setDetails?: (detail: any) => void,
  openModalStatus?: (id: number) => void,
) => {
  return (item: T, columnKey: React.Key) =>
    renderFn(mutate, item, columnKey, openModalEdit, openDetailsModal, setDetails, openModalStatus);
};
