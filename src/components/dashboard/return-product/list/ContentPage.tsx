'use client'

import useSubmitMutation from "@/src/hooks/dashboard/useSubmitMutation"
import { useModalUtils } from "@/src/hooks/modal/useModalUtils"
import { dashboardChangeStatusReturnService } from "@/src/services/dashboard/return/dashboardChangeStatusReturnService"
import { dashboardListReturnProductService } from "@/src/services/dashboard/return/dashboardListReturnService"
import { RenderCellReturn } from "../../return-product/list/RenderCellReturnProduct"
import GenericModal from "../../ui/generics/GenericModal"
import { TableComponent } from "../../ui/table/TableContent"
import { DashboardReturnProduct } from "@/src/types/dashboard/ReturnProductTypes"
import { AuthUserInfo } from "@/src/types/AuthTypes"
import { Columns } from "./Columns"
import GenericEditWrapper from "../../ui/generics/GenericEditWrapper"
import { dashboardFindByIdReturnService } from "@/src/services/dashboard/return/dashboardFindByIdReturnService"
import { getRenderCell } from "../../ui/getRenderCell"


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
                columns={Columns}
                queryKey="returnsProducts"
                functionService={dashboardListReturnProductService}
                defaultVisibleColumns={["codigo_lote", "cantidad", "fecha_devolucion", "reposicion_aplicada", "estado", "actions"]}
                searchableField="codigo_lote"
                renderCells={getRenderCell(RenderCellReturn, mutate, openModalEdit)}
            />

            {id && (
                <GenericEditWrapper
                    id={id}
                    closeModal={closeModal}
                    serviceFunction={dashboardFindByIdReturnService}
                    queryKey="returnProduct"
                    user={user}
                />
            )}

            <GenericModal user={user} closeModal={closeModal} />
        </div>
    )
}