'use client'

import { TableComponent } from '@/src/components/dashboard/ui/table/TableContent'
import { useModalUtils } from '@/src/hooks/modal/useModalUtils'
import GenericModal from '../../ui/GenericModal'
import useSubmitMutation from '@/src/hooks/dashboard/useSubmitMutation'
import { Columns } from './Columns'
import { DashboardReturn } from '@/src/types/dashboard/ReturnTypes'
import { dashboardListReturnService } from '@/src/services/dashboard/return/dashboardListReturnService'
import { RenderCellReturn } from './RenderCellReturn'
import { useAppStore } from '@/src/store/useAppStore'
import EditReturnWrapper from '../edit/EditReturnWrapper'
import { dashboardChangeStatusReturnService } from '@/src/services/dashboard/return/dashboardChangeStatusReturnService'

export default function ContentPage({ id }: { id: string | undefined }) {
    const idReturnProduct = useAppStore(state => state.idReturnProduct)
    const { openModalCreate, openModalEdit, closeModal } = useModalUtils()

    const { mutate } = useSubmitMutation({
        serviceFunction: dashboardChangeStatusReturnService,
        invalidateQuery: ["returns"]
    })

    return (
        <div>
            <TableComponent<DashboardReturn>
                openModalCreate={openModalCreate}
                openModalEdit={openModalEdit}
                columns={Columns}
                queryKey="returns"
                functionService={dashboardListReturnService}
                defaultVisibleColumns={["proveedor", "producto", "cantidad", "fecha_ingreso", "activo", "actions"]}
                searchableField="producto"
                mutate={mutate}
                renderCells={RenderCellReturn}
            />

            {idReturnProduct !== null && <GenericModal closeModal={closeModal} idReturnProduct={idReturnProduct} />}
            {id && <EditReturnWrapper closeModal={closeModal} id={id} />} 
        </div>
    )
}