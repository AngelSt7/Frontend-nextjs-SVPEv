import { DashboardSale } from '@/src/types/dashboard/SaleTypes'
import React from 'react'
import { FiPackage, FiGrid, FiDollarSign, FiTrendingUp } from 'react-icons/fi'

export default function DetailProduct({ item } : { item: DashboardSale['detallesVenta'][0] }) {
    return (
        <>
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <FiPackage className="text-blue-600 dark:text-blue-400 text-lg" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-lg leading-tight mb-1">
                            {item.nombreProducto}
                        </h3>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="flex items-center justify-center gap-1 mb-2">
                        <FiGrid className="text-purple-500 text-sm" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Cantidad</span>
                    </div>
                    <span className="text-xl font-bold text-purple-600 dark:text-purple-400">
                        {item.cantidad}
                    </span>
                </div>

                <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <div className="flex items-center justify-center gap-1 mb-2">
                        <FiDollarSign className="text-orange-500 text-sm" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Precio Unit.</span>
                    </div>
                    <span className="text-xl font-bold text-orange-600 dark:text-orange-400">
                        S/. {item.precioUnitario.toFixed(2)}
                    </span>
                </div>

                <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center justify-center gap-1 mb-2">
                        <FiTrendingUp className="text-green-500 text-sm" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Total</span>
                    </div>
                    <span className="text-xl font-bold text-green-600 dark:text-green-400">
                        S/. {item.total.toFixed(2)}
                    </span>
                </div>
            </div>
        </>
    )
}
