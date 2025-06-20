'use client'

import { TableComponent } from '@/src/components/dashboard/ui/table/TableContent'
import { useModalUtils } from '@/src/hooks/modal/useModalUtils'
import GenericModal from '../../ui/generics/GenericModal'
import useSubmitMutation from '@/src/hooks/dashboard/useSubmitMutation'
import { Columns } from './Columns'
import { DashboardReturnSale } from '@/src/types/dashboard/ReturnSaleTypes'
import { dashboardListReturnSaleService } from '@/src/services/dashboard/return-sale/dashboardListReturnSaleService'
import { RenderCellReturnSale } from './RenderCellReturnSale'
import { useAppStore } from '@/src/store/useAppStore'
import EditReturnSaleWrapper from '../edit/EditReturnSaleWrapper'
import { dashboardChangeStatusReturnSaleService } from '@/src/services/dashboard/return-sale/dashboardChangeStatusReturnSaleService'
import { getRenderCell } from '../../ui/getRenderCell'

export default function ContentPage({ id }: { id: string | undefined }) {
    const idReturnSaleDetail = useAppStore(state => state.idReturnSaleDetail)
    const { openModalCreate, openModalEdit, closeModal } = useModalUtils()

    const { mutate } = useSubmitMutation({
        serviceFunction: dashboardChangeStatusReturnSaleService,
        invalidateQuery: ["returns-sales"]
    })

    return (
        <div>
            <TableComponent<DashboardReturnSale>
                openModalCreate={openModalCreate}
                columns={Columns}
                queryKey="returns-sales"
                functionService={dashboardListReturnSaleService}
                defaultVisibleColumns={["correoUsuario", "motivo", "cantidad", "fecha", "actions"]}
                searchableField="motivo"
                renderCells={getRenderCell(RenderCellReturnSale, mutate, openModalEdit)}
            />

            {idReturnSaleDetail !== null && <GenericModal closeModal={closeModal} idReturnSaleDetail={idReturnSaleDetail} />}
            {id && <EditReturnSaleWrapper closeModal={closeModal} id={id} />} 
        </div>
    )
}