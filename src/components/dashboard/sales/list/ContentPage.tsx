'use client'

import { TableComponent } from '@/src/components/dashboard/ui/table/TableContent'
import useSubmitMutation from '@/src/hooks/dashboard/useSubmitMutation'
import { Columns } from './Columns'
import { DashboardSale } from '@/src/types/dashboard/SaleTypes'
import { dashboardListSaleService } from '@/src/services/dashboard/sales/dashboardListSaleService'
import { RenderCellSale } from './RenderCellsSale'
import { dashboardChangeStatusSalesService } from '@/src/services/dashboard/sales/dashboardChangeStatusSalesService'
import { getRenderCell } from '../../ui/getRenderCell'

export default function ContentPage() {

    const { mutate } = useSubmitMutation({
        serviceFunction: dashboardChangeStatusSalesService,
        invalidateQuery: ["sales"]
    })

    return (
        <div>
            <TableComponent<DashboardSale>
                columns={Columns}
                queryKey="sales"
                functionService={dashboardListSaleService}
                defaultVisibleColumns={[  "fecha",  "nombreCliente",  "nombreMetodoPago",  "total",  "cancelado",  "activo",  "actions"]}
                searchableField="nombreCliente"
                mutate={mutate}
                renderCells={getRenderCell(RenderCellSale, mutate)}
                isSales={false}
                newPath="/dashboard/ventas/registrar"
            />
        </div>
    )
}