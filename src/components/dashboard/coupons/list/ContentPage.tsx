'use client'

import { TableComponent } from '@/src/components/dashboard/ui/table/TableContent'
import { useModalUtils } from '@/src/hooks/modal/useModalUtils'
import useSubmitMutation from '@/src/hooks/dashboard/mutations/useSubmitMutation'
import { Columns } from './Columns'
import { DashboardCoupon } from '@/src/types/dashboard/CouponTypes'
import { RenderCellCoupons } from './RenderCellCoupons'
import GenericModal from '../../ui/generics/GenericModal'
import GenericEditWrapper from '../../ui/generics/GenericEditWrapper'
import { getRenderCell } from '../../ui/table/getRenderCell'
import { Coupon } from '@/src/services/dashboard/coupon/Coupon'

export default function ContentPage({ id }: { id: string | undefined }) {
    const queryKey = "coupons"
    const { openModalCreate, openModalEdit, closeModal } = useModalUtils()

    const { mutate } = useSubmitMutation({
        serviceFunction: Coupon.changeStatus,
        invalidateQuery: [queryKey]
    })

    return (
        <div>
            <TableComponent<DashboardCoupon>
                openModalCreate={openModalCreate}
                columns={Columns}
                queryKey={queryKey}
                functionService={Coupon.list}
                defaultVisibleColumns={["codigo", "tipoDescuento", "descuento", "fecha_inicio", "fecha_final", "activo", "actions"]}
                searchableField="codigo"
                renderCells={getRenderCell(RenderCellCoupons, mutate, openModalEdit)}
            />

            {id && (
                <GenericEditWrapper
                    id={id}
                    closeModal={closeModal}
                    serviceFunction={Coupon.find}
                    queryKey="coupon"
                />
            )}

            <GenericModal closeModal={closeModal} />

        </div>
    )
}