import { Product, ProductCart } from "@/src/types/dashboard/SaleTypes"
import { formatCurrency } from "@/src/utils/format/formatCurrency"
import { useState } from "react"

type ItemCartProps = {
    item: ProductCart,
    increaseQuantity: (id: Product['id']) => void,
    decreaseQuantity: (id: Product['id']) => void,
    deleteProduct: (id: Product['id']) => void
}

export default function ItemCart({ item, increaseQuantity, decreaseQuantity, deleteProduct }: ItemCartProps) {
    const [isDeleting, setIsDeleting] = useState(false)
    const styles = "w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-900 hover:border-gray-400 dark:hover:border-[#202020] focus:outline-none focus:ring-2 transition-all duration-200 flex items-center justify-center text-lg font-medium z-10"

    const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        if (target.tagName === 'BUTTON') return;
        setIsDeleting(true)
        setTimeout(() => {
            deleteProduct(item.id)
        }, 300)
    }


    return (
        <div
            className={`bg-white dark:bg-[#1e1e21] border border-gray-200 dark:border-[#202020] rounded-lg p-4 mb-3 shadow-sm transition-all duration-300 cursor-pointer select-none
                ${isDeleting
                    ? 'opacity-0 scale-95 transform translate-x-4'
                    : 'hover:shadow-md hover:border-red-200 dark:hover:border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20'
                }`}
            onDoubleClick={handleDoubleClick}
        >
            <div className="flex items-center justify-between mb-3 z-50">
                <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm flex-1">
                    {item.cantidad} x {item.nombre}
                </h3>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            decreaseQuantity(item.id)
                        }}
                        className={styles}
                    >
                        −
                    </button>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[20px] text-center">
                        {item.cantidad}
                    </span>
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            increaseQuantity(item.id)
                        }}
                        className={styles}
                    >
                        +
                    </button>
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Precio unitario:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{formatCurrency(item.precio_venta)}</span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Descuento:</span>
                    <span className={`text-sm font-medium ${item.descuento ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'}`}>
                        {item.descuento ? `${item.descuento.toFixed(2)}%` : "No aplica"}
                    </span>
                </div>

                {item.descuento ? (
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Precio original:</span>
                        <span className="text-sm text-gray-400 dark:text-gray-500 line-through">
                            {formatCurrency((item.precio_venta / 0.82) * item.cantidad)}
                        </span>
                    </div>
                ) : null}


                <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-700">
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Subtotal:</span>
                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {formatCurrency(item.subtotal)}
                    </span>
                </div>

                <div className="flex justify-between items-center pt-1">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Total con IGV:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {formatCurrency(item.subtotal + item.igv)}
                    </span>
                </div>

            </div>

            <div className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-10 bg-red-500 dark:bg-red-600 rounded-lg transition-opacity duration-200"></div>
        </div>
    )
}