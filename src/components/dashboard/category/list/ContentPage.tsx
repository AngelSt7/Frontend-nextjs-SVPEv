'use client'

import { TableComponent } from '@/src/components/dashboard/ui/table/TableContent'
import { useModalUtils } from '@/src/hooks/modal/useModalUtils'
import GenericModal from '../../ui/GenericModal'
import useSubmitMutation from '@/src/hooks/dashboard/useSubmitMutation'
import { Columns } from './Columns'
import { DashboardCategory } from '@/src/types/CategoryTypes'
import { dashboardListCategoryService } from '@/src/services/dashboard/category/dashboardListCategoryService'
import { RenderCellCategory } from './RenderCellProduct'
import EditCategoryWrapper from '../edit/EditCategoryWrapper'
import { dashboardChangeStatusCategoryService } from '@/src/services/dashboard/category/dashboardChangeStatusCategoryService'

export default function ContentPage({ id }: { id: string | undefined }) {
    const { openModalCreate, openModalEdit, closeModal } = useModalUtils()

    const { mutate } = useSubmitMutation({
        serviceFunction: dashboardChangeStatusCategoryService,
        invalidateQuery: ["categories"]
    })

    return (    
        <div>
            <TableComponent<DashboardCategory>
                openModalCreate={openModalCreate}
                openModalEdit={openModalEdit}
                columns={Columns}
                queryKey="categories"
                functionService={dashboardListCategoryService}
                defaultVisibleColumns={["nombre", "activo", "actions"]}
                searchableField="nombre"
                mutate={mutate}
                renderCells={RenderCellCategory}
            />

            <GenericModal closeModal={closeModal} />
            {id && <EditCategoryWrapper closeModal={closeModal} id={id} />}
        </div>
    )
}