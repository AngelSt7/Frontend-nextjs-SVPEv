import { ProductWithDetails } from '@/src/types/dashboard/ProductTypes';
import React from 'react'
import { FaTrash } from 'react-icons/fa';
import StandaloneSeriesInput from './StandaloneSeriesInput';

type SelectedProduct = {
    product: ProductWithDetails
    handleRemoveProduct: (id: ProductWithDetails['id_producto']) => void
    handleUpdateProduct: (id: ProductWithDetails['id_producto'], updates: Partial<ProductWithDetails>) => void
}

export default function SelectedProduct({ product, handleRemoveProduct, handleUpdateProduct } : SelectedProduct) {
    return (
        <div
            key={product.id_producto}
            className="p-4 bg-white dark:bg-[#1a1a1c] border border-gray-200 dark:border-[#3f3f46] rounded-lg"
        >
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-base font-medium text-[#202021] dark:text-[#c5c5c7]">
                    {product.label}
                </h4>
                <button
                    type="button"
                    onClick={() => handleRemoveProduct(product.id_producto)}
                    className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                    title="Eliminar producto"
                >
                    <FaTrash size={16} />
                </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-[#202021] dark:text-[#c5c5c7] mb-1">
                        Cantidad
                    </label>
                    <input
                        type="number"
                        min="1"
                        value={product.cantidad}
                        onChange={(e) => handleUpdateProduct(product.id_producto, {
                            cantidad: parseInt(e.target.value) || 1
                        })}
                        className="text-sm block w-full h-[40px] p-2 border border-[#afaeae] dark:border-[#3f3f46] bg-[#f4f4f5] hover:bg-[#e4e4e7] dark:bg-[#242428] dark:hover:bg-[#3f3f46] rounded-md outline-none focus:ring-1 focus:ring-white/10"
                        placeholder="Cantidad"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#202021] dark:text-[#c5c5c7] mb-1">
                        Precio unitario (S/)
                    </label>
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={product.precio_unitario}
                        onChange={(e) => handleUpdateProduct(product.id_producto, {
                            precio_unitario: parseFloat(e.target.value) || 0
                        })}
                        className="text-sm block w-full h-[40px] p-2 border border-[#afaeae] dark:border-[#3f3f46] bg-[#f4f4f5] hover:bg-[#e4e4e7] dark:bg-[#242428] dark:hover:bg-[#3f3f46] rounded-md outline-none focus:ring-1 focus:ring-white/10"
                        placeholder="0.00"
                    />
                </div>
            </div>

            <div className="mb-2">
                <label className="flex items-center gap-2 text-sm font-medium text-[#202021] dark:text-[#c5c5c7]">
                    <input
                        type="checkbox"
                        checked={product.series_individuales.length > 0}
                        onChange={(e) => {
                            if (!e.target.checked) {
                                handleUpdateProduct(product.id_producto, {
                                    series_individuales: [],
                                    tipo_serie: 'SIN_SERIE'
                                });
                            }
                        }}
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    Agregar series individuales
                </label>
            </div>

            <StandaloneSeriesInput
                isEnabled={true}
                series={product.series_individuales}
                onSeriesChange={(series) => handleUpdateProduct(product.id_producto, {
                    series_individuales: series
                })}
            />

            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Tipo: {product.tipo_serie}
                {product.series_individuales.length > 0 && (
                    <span className="ml-2">({product.series_individuales.length} series)</span>
                )}
            </div>
        </div>
    )
}
