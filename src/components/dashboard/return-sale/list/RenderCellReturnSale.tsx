import { mutateProps } from "@/src/types/commonTypes/commonTypes";
import { formatDate } from "@/src/utils/format/formatDate";
import { DashboardReturnSale } from "@/src/types/dashboard/ReturnSaleTypes";

export const RenderCellReturnSale = (
  mutate: mutateProps,
  item: DashboardReturnSale, columnKey: React.Key
) => {

  const cellValue = item[columnKey as keyof typeof item];

  switch (columnKey) {

    case "correo":
      return (
        <p>{item.correo}</p>
    )

    case "fecha":
      return (
        <p>{formatDate(item.fecha.toString())}</p>
      )

    case "actions":
      return (
        <div className="relative flex justify-end items-center gap-2">
          
        </div>
      );
    default:
      return cellValue;
  }
};
