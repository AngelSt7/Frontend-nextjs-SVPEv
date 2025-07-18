'use client'

import { TableComponent } from '@/src/components/dashboard/ui/table/TableContent'
import useSubmitMutation from '@/src/hooks/dashboard/mutations/useSubmitMutation'
import { Columns } from './Columns'
import { DashboardSale } from '@/src/types/dashboard/SaleTypes'
import { dashboardListSaleService } from '@/src/services/dashboard/sales/dashboardListSaleService'
import { RenderCellSale } from './RenderCellsSale'
import { dashboardChangeStatusSalesService } from '@/src/services/dashboard/sales/dashboardChangeStatusSalesService'
import { getRenderCell } from '../../ui/table/getRenderCell'
import { useModalUtils } from '@/src/hooks/modal/useModalUtils'
import GenericModal from '../../ui/generics/GenericModal'
import { useAppStore } from '@/src/store/useAppStore'

export default function ContentPage() {
    const queryKey ="sales"

    const { openDetailsModal, closeModal } = useModalUtils();
    const setDetails = useAppStore(state => state.setDetails)

    const { mutate } = useSubmitMutation({
        serviceFunction: dashboardChangeStatusSalesService,
        invalidateQuery: [queryKey]
    })

    return (
        <div>
            <TableComponent<DashboardSale>
                columns={Columns}
                queryKey={queryKey}
                functionService={dashboardListSaleService}
                defaultVisibleColumns={["fecha",  "nombreCliente",  "nombreMetodoPago",  "total",  "cancelado",  "activo",  "actions"]}
                searchableField="nombreCliente"
                renderCells={getRenderCell(RenderCellSale, mutate, undefined, openDetailsModal, setDetails)}
                isSales={false}
                newPath="/dashboard/ventas/registrar"
            />

            <GenericModal closeModal={closeModal} />
        </div>
    )
}