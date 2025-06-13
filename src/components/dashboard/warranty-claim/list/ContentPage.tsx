'use client'

import useSubmitMutation from "@/src/hooks/dashboard/useSubmitMutation"
import { useModalUtils } from "@/src/hooks/modal/useModalUtils"
import { dashboardChangeStatusWarrantyClaimService } from "@/src/services/dashboard/warranty-claim/dashboardChangeStatusWarrantyClaimService"
import { dashboardListWarrantyClaimsService } from "@/src/services/dashboard/warranty-claim/dashboardListWarrantyClaimService"
import { Columns } from "../../warranty-claim/list/Columns"
import EditWarrantyClaimWrapper from "../../warranty-claim/edit/EditWarrantyClaimWrapper"
import { RenderCellWarrantyClaim } from "../../warranty-claim/list/RenderCellWarrantyClaim"
import GenericModal from "../../ui/GenericModal"
import { TableComponent } from "../../ui/table/TableContent"
import { DashboardWarrantyClaim } from "@/src/types/dashboard/WarrantyClaimTypes"
import { AuthUserInfo } from "@/src/types/AuthTypes"

export default function ContentPage({ id, user }: { id: string | undefined, user?: AuthUserInfo }) {
  const { openModalCreate, openModalEdit, closeModal } = useModalUtils()

  const { mutate } = useSubmitMutation({
    serviceFunction: dashboardChangeStatusWarrantyClaimService,
    invalidateQuery: ["warrantyClaims"]
  })

  return (
    <div>
      <TableComponent<DashboardWarrantyClaim>
        openModalCreate={openModalCreate}
        openModalEdit={openModalEdit}
        columns={Columns}
        queryKey="warrantyClaims"
        functionService={dashboardListWarrantyClaimsService}
        defaultVisibleColumns={[
          "id",
          "inicio_garantia",
          "final_garantia",
          "descripcion",
          "estado",
          "fecha_reclamo",
          "activo",
          "actions"
        ]}
        searchableField="descripcion"
        mutate={mutate}
        renderCells={RenderCellWarrantyClaim}
      />

      <GenericModal user={user} closeModal={closeModal} />
      {id && <EditWarrantyClaimWrapper user={user} closeModal={closeModal} id={id} />}
    </div>
  )
}
