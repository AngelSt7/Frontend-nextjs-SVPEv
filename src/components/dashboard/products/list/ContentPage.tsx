'use client'

import { TableComponent } from '@/src/components/dashboard/ui/table/TableContent'
import { useModalUtils } from '@/src/hooks/modal/useModalUtils'
import GenericModal from '../../ui/generics/GenericModal'
import { DashboardProduct } from '@/src/types/dashboard/ProductTypes'
import { Columns } from './Columns'
import useSubmitMutation from '@/src/hooks/dashboard/mutations/useSubmitMutation'
import { RenderCellProduct } from './RenderCellProduct'
import { AuthUserInfo } from '@/src/types/AuthTypes'
import GenericEditWrapper from '../../ui/generics/GenericEditWrapper'
import { getRenderCell } from '../../ui/table/getRenderCell'
import { Product } from '@/src/services/dashboard/product/Product'

export default function ContentPage({ id, user }: { id: string | undefined, user?: AuthUserInfo }) {
    const queryKey = "products"
    const { openModalCreate, openModalEdit, closeModal } = useModalUtils()

    const { mutate } = useSubmitMutation({
        serviceFunction: Product.changeStatus,
        invalidateQuery: [queryKey]
    })

    return (
        <div>
            <TableComponent<DashboardProduct>
                openModalCreate={openModalCreate}
                columns={Columns}
                queryKey={queryKey}
                functionService={Product.list}
                defaultVisibleColumns={["nombre", "precio_venta", "nombre_marca", "nombre_categoria", "sku", "min_stock", "activo", "actions"]}
                searchableField="nombre"
                renderCells={getRenderCell(RenderCellProduct, mutate, openModalEdit)}
            />

            {id && (
                <GenericEditWrapper
                    id={id}
                    user={user}
                    closeModal={closeModal}
                    serviceFunction={Product.find}
                    queryKey="product"
                />
            )}

            <GenericModal user={user} closeModal={closeModal} />
        </div>
    )
}