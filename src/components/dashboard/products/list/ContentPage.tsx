'use client'

import { TableComponent } from '@/src/components/dashboard/ui/table/TableContent'
import { useModalUtils } from '@/src/hooks/modal/useModalUtils'
import GenericModal from '../../ui/GenericModal'
import { DashboardProduct } from '@/src/types/ProductTypes'
import { Columns } from './Columns'
import { dashboardListProductService } from '@/src/services/dashboard/product/dashboardListProductService'
import EditProductWrapper from '../edit/EditProductWrapper'
import useSubmitMutation from '@/src/hooks/dashboard/useSubmitMutation'
import { dashboardChangeStatusProductService } from '@/src/services/dashboard/product/dashboardChangeStatusProductService'

export default function ContentPage({ id }: { id: string | undefined }) {
    const { openModalCreate, openModalEdit, closeModal } = useModalUtils()

    const { mutate } = useSubmitMutation({
        serviceFunction: dashboardChangeStatusProductService,
        invalidateQuery: ["products"]
    })

    return (
        <div>
            <TableComponent<DashboardProduct>
                openModalCreate={openModalCreate}
                openModalEdit={openModalEdit}
                columns={Columns}
                queryKey="products"
                functionService={dashboardListProductService}
                defaultVisibleColumns={["nombre", "precio_venta", "nombre_marca", "nombre_subcategoria", "min_stock", "activo", "actions"]}
                searchableField="nombre"
                mutate={mutate}
            />

            <GenericModal closeModal={closeModal} />
            {id && <EditProductWrapper closeModal={closeModal} id={id} />}
        </div>
    )
}
