'use client'

import { TableComponent } from '@/src/components/dashboard/ui/table/TableContent'
import { useModalUtils } from '@/src/hooks/modal/useModalUtils'
import GenericModal from '../../ui/GenericModal'
import useSubmitMutation from '@/src/hooks/dashboard/useSubmitMutation'
import { Columns } from './Columns'
import { RenderCellDiscount } from './RenderCellDiscount'
import { DashboardDiscount } from '@/src/types/DiscountTypes'
import EditDiscountWrapper from '../edit/EditDiscountWrapper'
import { dashboardListDiscountService } from '@/src/services/dashboard/discount/dashboardListDiscountService'
import { dashboardChangeStatusCategoryService } from '@/src/services/dashboard/category/dashboardChangeStatusCategoryService'

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
                defaultVisibleColumns={["categoria", "descuento", "fecha_inicio", "fecha_final", "activo", "actions"]}
                searchableField="categoria"
                mutate={mutate}
                renderCells={RenderCellDiscount}
            />

            <GenericModal closeModal={closeModal} />
            {id && <EditDiscountWrapper closeModal={closeModal} id={id} />}
        </div>
    )
}