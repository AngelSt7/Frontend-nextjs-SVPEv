'use client'

import { TableComponent } from '@/src/components/dashboard/ui/table/TableContent'
import { useModalUtils } from '@/src/hooks/modal/useModalUtils'
import useSubmitMutation from '@/src/hooks/dashboard/useSubmitMutation'
import { Columns } from './Columns'
import { DashboardCoupon } from '@/src/types/dashboard/CouponTypes'
import { RenderCellCoupons } from './RenderCellCoupons'
import { dashboardListCouponService } from '@/src/services/dashboard/coupon/dashboardListCouponService'
import GenericModal from '../../ui/generics/GenericModal'
import { dashboardChangeStatusCouponService } from '@/src/services/dashboard/coupon/dashboardChangeStatusCouponService'
import { dashboardFindByIdCouponService } from '@/src/services/dashboard/coupon/dashboardFindByIdCouponService'
import GenericEditWrapper from '../../ui/generics/GenericEditWrapper'
import { getRenderCell } from '../../ui/getRenderCell'

export default function ContentPage({ id }: { id: string | undefined }) {
    const { openModalCreate, openModalEdit, closeModal } = useModalUtils()

    const { mutate } = useSubmitMutation({
        serviceFunction: dashboardChangeStatusCouponService,
        invalidateQuery: ["coupons"]
    })

    return (
        <div>
            <TableComponent<DashboardCoupon>
                openModalCreate={openModalCreate}
                openModalEdit={openModalEdit}
                columns={Columns}
                queryKey="coupons"
                functionService={dashboardListCouponService}
                defaultVisibleColumns={["codigo", "tipoDescuento", "descuento", "fecha_inicio", "fecha_final", "activo", "actions"]}
                searchableField="codigo"
                mutate={mutate}
                renderCells={getRenderCell(RenderCellCoupons, mutate, openModalEdit)}
            />

            {id && (
                <GenericEditWrapper
                    id={id}
                    closeModal={closeModal}
                    serviceFunction={dashboardFindByIdCouponService}
                    queryKey="coupon"
                />
            )}

            <GenericModal closeModal={closeModal} />

        </div>
    )
}