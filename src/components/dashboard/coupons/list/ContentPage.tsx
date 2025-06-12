'use client'

import { TableComponent } from '@/src/components/dashboard/ui/table/TableContent'
import { useModalUtils } from '@/src/hooks/modal/useModalUtils'
import useSubmitMutation from '@/src/hooks/dashboard/useSubmitMutation'
import { Columns } from './Columns'
import { DashboardCoupon } from '@/src/types/dashboard/CouponTypes'
import { RenderCellCoupons } from './RenderCellCoupons'
import { dashboardListCouponService } from '@/src/services/dashboard/coupon/dashboardListCouponService'
import GenericModal from '../../ui/GenericModal'
import { dashboardChangeStatusCouponService } from '@/src/services/dashboard/coupon/dashboardChangeStatusCouponService'
import EditCouponWrapper from '../edit/EditCouponWrapper'

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
                renderCells={RenderCellCoupons}
            />

            <GenericModal closeModal={closeModal} />
            {id && <EditCouponWrapper closeModal={closeModal} id={id} />}
        </div>
    )
}