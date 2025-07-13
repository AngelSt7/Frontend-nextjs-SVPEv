'use client'

import { TableComponent } from '@/src/components/dashboard/ui/table/TableContent'
import { useModalUtils } from '@/src/hooks/modal/useModalUtils'
import GenericModal from '../../ui/generics/GenericModal'
import useSubmitMutation from '@/src/hooks/dashboard/mutations/useSubmitMutation'
import { DashboardCategory } from '@/src/types/dashboard/CategoryTypes'
import { RenderCellCategory } from './RenderCellCategory'
import { Columns } from './Columns'
import GenericEditWrapper from '../../ui/generics/GenericEditWrapper'
import { getRenderCell } from '../../ui/table/getRenderCell'
import { Category } from '@/src/services/dashboard/category/Category'

export default function ContentPage({ id }: { id: string | undefined }) {
    const { openModalCreate, openModalEdit, closeModal } = useModalUtils()

    const { mutate } = useSubmitMutation({
        serviceFunction: Category.changeStatus,
        invalidateQuery: ["categories"]
    })

    return (
        <div>
            <TableComponent<DashboardCategory>
                openModalCreate={openModalCreate}
                columns={Columns}
                queryKey="categories"
                functionService={Category.list}
                defaultVisibleColumns={["nombre", "activo", "actions"]}
                searchableField="nombre"
                renderCells={getRenderCell(RenderCellCategory, mutate, openModalEdit)}
            />

            {id && (
                <GenericEditWrapper
                    id={id}
                    closeModal={closeModal}
                    serviceFunction={Category.find}
                    queryKey="category"
                />
            )}

            <GenericModal closeModal={closeModal} />
        </div>
    )
}