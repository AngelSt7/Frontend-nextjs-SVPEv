'use client'

import { TableComponent } from '@/src/components/dashboard/ui/table/TableContent'
import { useModalUtils } from '@/src/hooks/modal/useModalUtils'
import GenericModal from '../../ui/generics/GenericModal'
import { Columns } from './Columns'
import { DashboardReturnSale } from '@/src/types/dashboard/ReturnSaleTypes'
import { RenderCellReturnSale } from './RenderCellReturnSale'
import { getRenderCell } from '../../ui/table/getRenderCell'
import { useAppStore } from '@/src/store/useAppStore'
import { ReturnSale } from '@/src/services/dashboard/return-sale/ReturnSale'
import GenericEditWrapper from '../../ui/generics/GenericEditWrapper'
import useSubmitMutation from '@/src/hooks/dashboard/mutations/useSubmitMutation'

export default function ContentPage({ id }: { id: string | undefined }) {
    const queryKey = "returns-sales"
    const {openModalCreate, openModalEdit, openDetailsModal, closeModal, openModalStatus } = useModalUtils();
    const setReturnDetails = useAppStore(state => state.setReturnDetails)

    const { mutate } = useSubmitMutation({
        serviceFunction: ReturnSale.changeStatus,
        invalidateQuery: [queryKey]
    })

    return (
        <div>
            <TableComponent<DashboardReturnSale>
                openModalCreate={openModalCreate}
                columns={Columns}
                queryKey={queryKey}
                functionService={ReturnSale.list}
                defaultVisibleColumns={["correo", "nombre_rol", "nombre_empleado", "estado", "fecha", "actions"]}
                searchableField="motivo"
                renderCells={getRenderCell(RenderCellReturnSale, mutate, openModalEdit, openDetailsModal, setReturnDetails, openModalStatus)}
            />

            {id && (
                <GenericEditWrapper
                    id={id}
                    closeModal={closeModal}
                    serviceFunction={ReturnSale.find}
                    queryKey={queryKey}
                />
            )}

            <GenericModal closeModal={closeModal} />
        </div>
    )
}