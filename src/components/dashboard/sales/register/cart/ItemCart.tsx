import { Product, ProductCart } from "@/src/types/dashboard/SaleTypes"
import { formatCurrency } from "@/src/utils/format/formatCurrency"
import { Button, Tooltip } from "@heroui/react"
import { useState } from "react"

type ItemCartProps = {
    item: ProductCart,
    increaseQuantity: (id: Product['id']) => void,
    decreaseQuantity: (id: Product['id']) => void,
    deleteProduct: (id: Product['id']) => void
}

export default function ItemCart({ item, increaseQuantity, decreaseQuantity, deleteProduct }: ItemCartProps) {
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDoubleClick = () => {
        setIsDeleting(true)
        setTimeout(() => {
            deleteProduct(item.id)
        }, 300)
    }

    return (
        <div 
            className={`bg-white border border-gray-200 rounded-lg p-4 mb-3 shadow-sm transition-all duration-300 cursor-pointer select-none
                ${isDeleting 
                    ? 'opacity-0 scale-95 transform translate-x-4' 
                    : 'hover:shadow-md hover:border-red-200 hover:bg-red-50'
                }`}
            onDoubleClick={handleDoubleClick}
        >
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-900 text-sm flex-1">
                    {item.cantidad} x {item.nombre}
                </h3>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            decreaseQuantity(item.id)
                        }}
                        className="w-8 h-8 rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all duration-200 flex items-center justify-center text-lg font-medium z-10"
                    >
                        −
                    </button>
                    <span className="text-sm font-medium text-gray-700 min-w-[20px] text-center">
                        {item.cantidad}
                    </span>
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            increaseQuantity(item.id)
                        }}
                        className="w-8 h-8 rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all duration-200 flex items-center justify-center text-lg font-medium z-10"
                    >
                        +
                    </button>
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Precio unitario:</span>
                    <span className="text-sm font-medium text-gray-900">{formatCurrency(item.precio_venta)}</span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Descuento:</span>
                    <span className={`text-sm font-medium ${item.descuento ? 'text-green-600' : 'text-gray-400'}`}>
                        {item.descuento ? `${item.descuento.toFixed(2)}%` : "No aplica"}
                    </span>
                </div>

                {item.descuento ? (
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">Precio original:</span>
                        <span className="text-sm text-gray-400 line-through">
                            {formatCurrency(item.precio_venta * item.cantidad)}
                        </span>
                    </div>
                ) : null}

                {/* Precio final */}
                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                    <span className="text-sm font-medium text-gray-900">Subtotal:</span>
                    <span className="text-lg font-bold text-blue-600">
                        {formatCurrency(item.subtotal)}
                    </span>
                </div>
            </div>

            <div className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-10 bg-red-500 rounded-lg transition-opacity duration-200"></div>
        </div>
    )
}