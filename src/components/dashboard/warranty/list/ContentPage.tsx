'use client'

import useSubmitMutation from "@/src/hooks/dashboard/useSubmitMutation";
import { useModalUtils } from "@/src/hooks/modal/useModalUtils";
import { dashboardChangeStatusWarrantyService } from "@/src/services/dashboard/warranty/dashboardChangeStatusWarrantyService";
import { dashboardListWarrantiesService } from "@/src/services/dashboard/warranty/dashboardListWarrantyService";
import { Columns } from "../../warranty/list/Columns";
import EditWarrantyWrapper from "../../warranty/edit/EditWarrantyWrapper";
import { RenderCellWarranty } from "../../warranty/list/RenderCellWarranty";
import GenericModal from "../../ui/generics/GenericModal";
import { TableComponent } from "../../ui/table/TableContent";
import { DashboardWarranty } from "@/src/types/dashboard/WarrantyTypes";
import { AuthUserInfo } from "@/src/types/AuthTypes";
import { getRenderCell } from "../../ui/getRenderCell";

export default function ContentPage({ id, user }: { id: string | undefined, user?: AuthUserInfo }) {
  const { openModalCreate, openModalEdit, closeModal } = useModalUtils();

  const { mutate } = useSubmitMutation({
    serviceFunction: dashboardChangeStatusWarrantyService,
    invalidateQuery: ["warranties"],
  });

  return (
    <div>
      <TableComponent<DashboardWarranty>
        openModalCreate={openModalCreate}
        openModalEdit={openModalEdit}
        columns={Columns}
        queryKey="warranties"
        functionService={dashboardListWarrantiesService}
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
        mutate={mutate}
        renderCells={getRenderCell(RenderCellWarranty, mutate, openModalEdit)}
      />

      <GenericModal user={user} closeModal={closeModal} />
      {id && <EditWarrantyWrapper user={user} closeModal={closeModal} id={id} />}
    </div>
  );
}
