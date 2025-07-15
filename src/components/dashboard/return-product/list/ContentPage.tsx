'use client'

import useSubmitMutation from "@/src/hooks/dashboard/mutations/useSubmitMutation"
import { useModalUtils } from "@/src/hooks/modal/useModalUtils"
import { RenderCellReturn } from "../../return-product/list/RenderCellReturnProduct"
import GenericModal from "../../ui/generics/GenericModal"
import { TableComponent } from "../../ui/table/TableContent"
import { DashboardReturnProduct } from "@/src/types/dashboard/ReturnProductTypes"
import { AuthUserInfo } from "@/src/types/AuthTypes"
import { Columns } from "./Columns"
import GenericEditWrapper from "../../ui/generics/GenericEditWrapper"
import { getRenderCell } from "../../ui/table/getRenderCell"
import { ReturnProduct } from "@/src/services/dashboard/return/ReturnProduct"


export default function ContentPage({ id, user }: { id: string | undefined, user?: AuthUserInfo }) {
    const queryKey = "returnsProducts"
    const { openModalCreate, openModalEdit, closeModal } = useModalUtils()

    const { mutate } = useSubmitMutation({
        serviceFunction: ReturnProduct.changeStatus,
        invalidateQuery: [queryKey]
    })

    return (
        <div>
            <TableComponent<DashboardReturnProduct>
                openModalCreate={openModalCreate}
                columns={Columns}
                queryKey={queryKey}
                functionService={ReturnProduct.list}
                defaultVisibleColumns={["codigo_lote", "cantidad", "fecha_devolucion", "reposicion_aplicada", "estado", "actions"]}
                searchableField="codigo_lote"
                renderCells={getRenderCell(RenderCellReturn, mutate, openModalEdit)}
            />

            {id && (
                <GenericEditWrapper
                    id={id}
                    closeModal={closeModal}
                    serviceFunction={ReturnProduct.find}
                    queryKey="returnProduct"
                    user={user}
                />
            )}

            <GenericModal user={user} closeModal={closeModal} />
        </div>
    )
}