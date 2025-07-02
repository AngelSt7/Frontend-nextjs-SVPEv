import { FiPackage, FiHash } from 'react-icons/fi'
import { HiOutlineSparkles } from 'react-icons/hi'

type DetailProps = {
    index: number
    item: {
        id_producto: number;
        nombreProducto: string;
        cantidad: number;
    }
}

export default function DetailItem({ item, index }: DetailProps) {
    return (
        <div className="bg-white dark:bg-[#212124] rounded-lg border border-gray-200 dark:border-none p-6 hover:shadow-lg dark:hover:shadow-xl transition-all duration-200 hover:border-blue-300 dark:hover:border-none">
            <div className="space-y-4">

                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                            <FiPackage className="text-blue-600 dark:text-blue-400 text-xl" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white text-lg leading-tight">
                                {item.nombreProducto}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                Producto devuelto
                            </p>
                        </div>
                    </div>

                    <div className="px-3 py-1 bg-gray-100 dark:bg-[#1d1d1f] rounded-full">
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                            #{index + 1}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#1d1d1f] rounded-lg">
                        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                            <HiOutlineSparkles className="text-green-600 dark:text-green-400 text-lg" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                Cantidad
                            </p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                {item.cantidad}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#1d1d1f] rounded-lg">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                            <FiHash className="text-purple-600 dark:text-purple-400 text-lg" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                ID Producto
                            </p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white font-mono">
                                {item.id_producto}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}