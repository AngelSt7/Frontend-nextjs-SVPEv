'use client'

import useSubmitMutation from "@/src/hooks/dashboard/mutations/useSubmitMutation"
import { useModalUtils } from "@/src/hooks/modal/useModalUtils"
import { Columns } from "../../warranty-claim/list/Columns"
import { RenderCellWarrantyClaim } from "../../warranty-claim/list/RenderCellWarrantyClaim"
import GenericModal from "../../ui/generics/GenericModal"
import { TableComponent } from "../../ui/table/TableContent"
import { DashboardWarrantyClaim } from "@/src/types/dashboard/WarrantyClaimTypes"
import { AuthUserInfo } from "@/src/types/AuthTypes"
import { getRenderCell } from "../../ui/table/getRenderCell"
import { WarrantyClaim } from "@/src/services/dashboard/warranty-claim/WarrantyClaim"
import GenericEditWrapper from "../../ui/generics/GenericEditWrapper"

export default function ContentPage({ id, user }: { id: string | undefined, user?: AuthUserInfo }) {
  const { openModalCreate, openModalEdit, closeModal } = useModalUtils()

  const { mutate } = useSubmitMutation({
    serviceFunction: WarrantyClaim.changeStatus,
    invalidateQuery: ["warrantyClaims"]
  })

  return (
    <div>
      <TableComponent<DashboardWarrantyClaim>
        openModalCreate={openModalCreate}
        columns={Columns}
        queryKey="warrantyClaims"
        functionService={WarrantyClaim.list}
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
        renderCells={getRenderCell(RenderCellWarrantyClaim, mutate, openModalEdit)}
      />

      {id && (
        <GenericEditWrapper
          id={id}
          closeModal={closeModal}
          serviceFunction={WarrantyClaim.find}
          queryKey="warrantyClaim"
        />
      )}

      <GenericModal user={user} closeModal={closeModal} />
    </div>
  )
}
