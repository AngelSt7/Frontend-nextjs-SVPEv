'use client'

import { TableComponent } from '@/src/components/dashboard/ui/table/TableContent'
import { useModalUtils } from '@/src/hooks/modal/useModalUtils'
import GenericModal from '../../ui/generics/GenericModal'
import useSubmitMutation from '@/src/hooks/dashboard/useSubmitMutation'
import { DashboardCategory } from '@/src/types/dashboard/CategoryTypes'
import { dashboardListCategoryService } from '@/src/services/dashboard/category/dashboardListCategoryService'
import { RenderCellCategory } from './RenderCellCategory'
import { dashboardChangeStatusCategoryService } from '@/src/services/dashboard/category/dashboardChangeStatusCategoryService'
import { Columns } from './Columns'
import GenericEditWrapper from '../../ui/generics/GenericEditWrapper'
import { dashboardFindByIdCategoryService } from '@/src/services/dashboard/category/dashboardFindByIdCategoryService'
import { getRenderCell } from '../../ui/getRenderCell'

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
                columns={Columns}
                queryKey="categories"
                functionService={dashboardListCategoryService}
                defaultVisibleColumns={["nombre", "activo", "actions"]}
                searchableField="nombre"
                renderCells={getRenderCell(RenderCellCategory, mutate, openModalEdit)}
            />

            {id && (
                <GenericEditWrapper
                    id={id}
                    closeModal={closeModal}
                    serviceFunction={dashboardFindByIdCategoryService}
                    queryKey="category"
                />
            )}

            <GenericModal closeModal={closeModal} />
        </div>
    )
}