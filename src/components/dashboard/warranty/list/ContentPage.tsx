'use client'

import useSubmitMutation from "@/src/hooks/dashboard/mutations/useSubmitMutation";
import { useModalUtils } from "@/src/hooks/modal/useModalUtils";
import { Columns } from "../../warranty/list/Columns";
import { RenderCellWarranty } from "../../warranty/list/RenderCellWarranty";
import GenericModal from "../../ui/generics/GenericModal";
import { TableComponent } from "../../ui/table/TableContent";
import { DashboardWarranty } from "@/src/types/dashboard/WarrantyTypes";
import { AuthUserInfo } from "@/src/types/AuthTypes";
import { getRenderCell } from "../../ui/table/getRenderCell";
import { Warranty } from "@/src/services/dashboard/warranty/Warranty";
import GenericEditWrapper from "../../ui/generics/GenericEditWrapper";

export default function ContentPage({ id, user }: { id: string | undefined, user?: AuthUserInfo }) {
  const queryKey = "warranties"
  const { openModalCreate, openModalEdit, closeModal } = useModalUtils();

  const { mutate } = useSubmitMutation({
    serviceFunction: Warranty.update,
    invalidateQuery: [queryKey],
  });

  return (
    <div>
      <TableComponent<DashboardWarranty>
        openModalCreate={openModalCreate}
        columns={Columns}
        queryKey={queryKey}
        functionService={Warranty.list}
        defaultVisibleColumns={[
          "id",
          "producto",
          "cantidad",
          "inicioGarantia",
          "finGarantia",
          "activo",
          "actions",
        ]}
        searchableField="producto"
        renderCells={getRenderCell(RenderCellWarranty, mutate, openModalEdit)}
      />


      {id && (
        <GenericEditWrapper
          id={id}
          closeModal={closeModal}
          serviceFunction={Warranty.find}
          queryKey="Warranty"
        />
      )}

      <GenericModal user={user} closeModal={closeModal} />
    </div>
  );
}
