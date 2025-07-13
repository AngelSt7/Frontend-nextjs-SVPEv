'use client'

import { TableComponent } from '@/src/components/dashboard/ui/table/TableContent'
import { DashboardProduct } from '@/src/types/dashboard/ProductTypes'
import { Columns } from './Columns'
import { useAppStore } from '@/src/store/useAppStore'
import { renderCellCart } from './RenderCellProduct'
import { getRenderCellCart } from '../../../ui/table/getRenderCellCart'
import { Product } from '@/src/services/dashboard/product/Product'

export default function ContentPage() {
    const addProduct = useAppStore(state => state.addProduct)

    return (
        <div>
            <TableComponent<DashboardProduct>
                columns={Columns}
                queryKey="products-sales"
                functionService={Product.listToSales}
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