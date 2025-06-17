'use client'

import { TableComponent } from '@/src/components/dashboard/ui/table/TableContent'
import { DashboardProduct } from '@/src/types/dashboard/ProductTypes'
import { Columns } from './Columns'
import { dashboardListProductSalesService } from '@/src/services/dashboard/product/dashboardListProductService'
import { useAppStore } from '@/src/store/useAppStore'
import { renderCellCart } from './RenderCellProduct'
import { getRenderCellCart } from '../../../ui/getRenderCellCart'

export default function ContentPage() {
    const addProduct = useAppStore(state => state.addProduct)

    return (
        <div>
            <TableComponent<DashboardProduct>
                columns={Columns}
                queryKey="products-sales"
                functionService={dashboardListProductSalesService}
                defaultVisibleColumns={["nombre", "precio_venta", "nombre_marca", "nombre_categoria", "min_stock", "stock_actual", "garantia_meses", "actions"]}
                searchableField="nombre"
                showActions={false}
                isSales={true}
                renderCellsCart={getRenderCellCart(
                    renderCellCart,
                    addProduct
                )}
            />
        </div>
    )
}