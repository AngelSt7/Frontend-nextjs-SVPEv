'use client'

import { TableComponent } from '@/src/components/dashboard/ui/table/TableContent'
import { DashboardProduct } from '@/src/types/dashboard/ProductTypes'
import { Columns } from './Columns'
import { dashboardListProductSalesService } from '@/src/services/dashboard/product/dashboardListProductService'
import { AuthUserInfo } from '@/src/types/AuthTypes'
import { useAppStore } from '@/src/store/useAppStore'
import { renderCellSaleProduct } from './RenderCellProduct'

export default function ContentPage({ user }: { user?: AuthUserInfo }) {
    
    const addProduct = useAppStore(state => state.addProduct)
    const decreaseQuantity = useAppStore(state => state.decreaseQuantity)
    const increaseQuantity = useAppStore(state => state.increaseQuantity)

    return (
        <div>
            <TableComponent<DashboardProduct>
                addProduct={addProduct}
                decreaseQuantity={decreaseQuantity}
                increaseQuantity={increaseQuantity}
                columns={Columns}
                queryKey="products-sales"
                functionService={dashboardListProductSalesService}
                defaultVisibleColumns={["nombre", "precio_venta", "nombre_marca", "nombre_categoria", "min_stock", "stock_actual", "garantia_meses", "actions"]}
                searchableField="nombre"
                renderCellSaleProduct={renderCellSaleProduct}
                showActions={false}
                isSales={true}
            />
        </div>
    )
}