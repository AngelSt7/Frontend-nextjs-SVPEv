'use client'

import { TableComponent } from '@/src/components/dashboard/ui/table/TableContent'
import { useModalUtils } from '@/src/hooks/modal/useModalUtils'
import GenericModal from '../../ui/GenericModal'
import { Columns } from './Columns'
import useSubmitMutation from '@/src/hooks/dashboard/useSubmitMutation'
import { AuthUserInfo } from '@/src/types/AuthTypes'
import { RenderCellStock } from './RenderCellStock'
import { dashboardListStockService } from '@/src/services/dashboard/stock/dashboardListStockService'
import { DashboardStock } from '@/src/types/dashboard/Stocktypes'
import { dashboardChangeStatusStockService } from '@/src/services/dashboard/stock/dashboardChangeStatusStockService'

export default function ContentPage({ id, user }: { id: string | undefined, user?: AuthUserInfo }) {
    const { openModalCreate, openModalEdit, closeModal } = useModalUtils()

    const { mutate } = useSubmitMutation({
        serviceFunction: dashboardChangeStatusStockService,
        invalidateQuery: ["stocks"]
    })

    return (
        <div>
            <TableComponent<DashboardStock>
                openModalCreate={openModalCreate}
                openModalEdit={openModalEdit}
                columns={Columns}
                queryKey="stocks"
                functionService={dashboardListStockService}
                defaultVisibleColumns={["producto", "proveedor", "lote", "tipo_documento", "numero_documento", "activo", "actions"]}
                searchableField="producto"
                mutate={mutate}
                renderCells={RenderCellStock}
            />

            <GenericModal user={user} closeModal={closeModal} />
            {/* {id && user && <EditProductWrapper user={user} closeModal={closeModal} id={id} />} */}
        </div>
    )
}