'use client'

import { TableComponent } from '@/src/components/dashboard/ui/table/TableContent'
import { useModalUtils } from '@/src/hooks/modal/useModalUtils'
import GenericModal from '../../ui/generics/GenericModal'
import useSubmitMutation from '@/src/hooks/dashboard/useSubmitMutation'
import { Columns } from './Columns'
import { RenderCellDiscount } from './RenderCellDiscount'
import { DashboardDiscount } from '@/src/types/dashboard/DiscountTypes'
import { dashboardListDiscountService } from '@/src/services/dashboard/discount/dashboardListDiscountService'
import { dashboardChangeStatusCategoryService } from '@/src/services/dashboard/category/dashboardChangeStatusCategoryService'
import GenericEditWrapper from '../../ui/generics/GenericEditWrapper'
import { dashboardFindByIdDiscountService } from '@/src/services/dashboard/discount/dashboardFindByIdDiscountService'
import { getRenderCell } from '../../ui/getRenderCell'

export default function ContentPage({ id }: { id: string | undefined }) {
    const { openModalCreate, openModalEdit, closeModal } = useModalUtils()

    const { mutate } = useSubmitMutation({
        serviceFunction: dashboardChangeStatusCategoryService,
        invalidateQuery: ["discounts"]
    })

    return (
        <div>
            <TableComponent<DashboardDiscount>
                openModalCreate={openModalCreate}
                openModalEdit={openModalEdit}
                columns={Columns}
                queryKey="discounts"
                functionService={dashboardListDiscountService}
                defaultVisibleColumns={["nombreCategoria", "porcentaje", "fecha_inicio", "fecha_final", "activo", "actions"]}
                searchableField="nombreCategoria"
                mutate={mutate}
                renderCells={getRenderCell(RenderCellDiscount, mutate, openModalEdit)}
            />

            {id && (
                <GenericEditWrapper
                    id={id}
                    closeModal={closeModal}
                    serviceFunction={dashboardFindByIdDiscountService}
                    queryKey="discount"
                />
            )}

            <GenericModal closeModal={closeModal} />
        </div>
    )
}