'use client'

import useSubmitMutation from "@/src/hooks/dashboard/useSubmitMutation"
import { useModalUtils } from "@/src/hooks/modal/useModalUtils"
import { dashboardChangeStatusReturnService } from "@/src/services/dashboard/return/dashboardChangeStatusReturnService"
import { dashboardListReturnProductService } from "@/src/services/dashboard/return/dashboardListReturnService"
import { Columns } from "../../category/list/Columns"
import EditReturnWrapper from "../../return-product/edit/EditReturnProductWrapper"
import { RenderCellReturn } from "../../return-product/list/RenderCellReturnProduct"
import GenericModal from "../../ui/GenericModal"
import { TableComponent } from "../../ui/table/TableContent"
import { DashboardReturnProduct } from "@/src/types/dashboard/ReturnProductTypes"
import { AuthUserInfo } from "@/src/types/AuthTypes"


export default function ContentPage({ id, user }: { id: string | undefined, user?: AuthUserInfo }) {
    const { openModalCreate, openModalEdit, closeModal } = useModalUtils()

    const { mutate } = useSubmitMutation({
        serviceFunction: dashboardChangeStatusReturnService,
        invalidateQuery: ["returnsProducts"]
    })

    return (
        <div>
            <TableComponent<DashboardReturnProduct>
                openModalCreate={openModalCreate}
                openModalEdit={openModalEdit}
                columns={Columns}
                queryKey="returnsProducts"
                functionService={dashboardListReturnProductService}
                defaultVisibleColumns={[ "id", "codigo_lote", "cantidad", "fecha_devolucion", "motivo", "estado", "actions"]}
                searchableField="codigo_lote"
                mutate={mutate}
                renderCells={RenderCellReturn}
            />

            <GenericModal user={user} closeModal={closeModal}  />
            {id && <EditReturnWrapper user={user} closeModal={closeModal} id={id} />} 
        </div>
    )
}