'use client'

import { TableComponent } from '@/src/components/dashboard/ui/table/TableContent'
import { useModalUtils } from '@/src/hooks/modal/useModalUtils'
import GenericModal from '../../ui/generics/GenericModal'
import useSubmitMutation from '@/src/hooks/dashboard/mutations/useSubmitMutation'
import { Columns } from './Columns'
import { RenderCellDiscount } from './RenderCellDiscount'
import { DashboardDiscount } from '@/src/types/dashboard/DiscountTypes'
import GenericEditWrapper from '../../ui/generics/GenericEditWrapper'
import { getRenderCell } from '../../ui/table/getRenderCell'
import { Discount } from '@/src/services/dashboard/discount/Discount'

export default function ContentPage({ id }: { id: string | undefined }) {
    const queryKey = "discounts"
    const { openModalCreate, openModalEdit, closeModal } = useModalUtils()

    const { mutate } = useSubmitMutation({
        serviceFunction: Discount.changeStatus,
        invalidateQuery: [queryKey]
    })

    return (
        <div>
            <TableComponent<DashboardDiscount>
                openModalCreate={openModalCreate}
                columns={Columns}
                queryKey={queryKey}
                functionService={Discount.list}
                defaultVisibleColumns={["nombreCategoria", "porcentaje", "fecha_inicio", "fecha_final", "activo", "actions"]}
                searchableField="nombreCategoria"
                renderCells={getRenderCell(RenderCellDiscount, mutate, openModalEdit)}
            />

            {id && (
                <GenericEditWrapper
                    id={id}
                    closeModal={closeModal}
                    serviceFunction={Discount.find}
                    queryKey="discount"
                />
            )}

            <GenericModal closeModal={closeModal} />
        </div>
    )
}