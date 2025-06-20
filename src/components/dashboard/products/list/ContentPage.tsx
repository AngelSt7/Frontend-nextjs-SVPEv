'use client'

import { TableComponent } from '@/src/components/dashboard/ui/table/TableContent'
import { useModalUtils } from '@/src/hooks/modal/useModalUtils'
import GenericModal from '../../ui/generics/GenericModal'
import { DashboardProduct } from '@/src/types/dashboard/ProductTypes'
import { Columns } from './Columns'
import { dashboardListProductService } from '@/src/services/dashboard/product/dashboardListProductService'
import useSubmitMutation from '@/src/hooks/dashboard/useSubmitMutation'
import { dashboardChangeStatusProductService } from '@/src/services/dashboard/product/dashboardChangeStatusProductService'
import { RenderCellProduct } from './RenderCellProduct'
import { AuthUserInfo } from '@/src/types/AuthTypes'
import GenericEditWrapper from '../../ui/generics/GenericEditWrapper'
import { dashboardFindByIdProductService } from '@/src/services/dashboard/product/dashboardFindByIdProductService'
import { getRenderCell } from '../../ui/getRenderCell'

export default function ContentPage({ id, user }: { id: string | undefined, user?: AuthUserInfo }) {
    const { openModalCreate, openModalEdit, closeModal } = useModalUtils()

    const { mutate } = useSubmitMutation({
        serviceFunction: dashboardChangeStatusProductService,
        invalidateQuery: ["products"]
    })

    return (
        <div>
            <TableComponent<DashboardProduct>
                openModalCreate={openModalCreate}
                columns={Columns}
                queryKey="products"
                functionService={dashboardListProductService}
                defaultVisibleColumns={["nombre", "precio_venta", "nombre_marca", "nombre_categoria", "sku", "min_stock", "activo", "actions"]}
                searchableField="nombre"
                renderCells={getRenderCell(RenderCellProduct, mutate, openModalEdit)}
            />

            {id && (
                <GenericEditWrapper
                    id={id}
                    user={user}
                    closeModal={closeModal}
                    serviceFunction={dashboardFindByIdProductService}
                    queryKey="product"
                />
            )}

            <GenericModal user={user} closeModal={closeModal} />
        </div>
    )
}