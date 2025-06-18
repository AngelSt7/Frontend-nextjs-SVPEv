import { useAppStore } from '@/src/store/useAppStore'
import { FiTrendingUp } from 'react-icons/fi'
import { HiOutlineSparkles, HiOutlineCalendar } from 'react-icons/hi'
import DetailProduct from './DetailProduct'

export default function DetailsProduct() {
  const detail = useAppStore(state => state.detail)
  const totalAmount = detail.reduce((sum, item) => sum + item.total, 0)
  const totalItems = detail.reduce((sum, item) => sum + item.cantidad, 0)

  return (
    <div className="space-y-6">

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:bg-[#1e1e21] dark:from-transparent dark:to-transparent rounded-xl p-6 border border-gray-200 dark:border-[#202020]">

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <HiOutlineSparkles className="text-purple-500" />
            Detalles de Venta
          </h2>

          <div className="text-end">
            <div className="flex justify-end items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1 w-full">
              <HiOutlineCalendar className="w-4 h-4" />
              <span className="font-medium text-end">Fecha de Venta</span>
            </div>
            <div className="bg-gray-50 dark:bg-[#232326] px-3 py-2 rounded-lg border border-gray-200 dark:border-[#202020]">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {new Date(detail[0].fechaCreacion).toLocaleString("es-PE", {
                  weekday: "long", day: "2-digit",
                  month: "long", year: "numeric",
                })}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                {new Date(detail[0].fechaCreacion).toLocaleString("es-PE", {
                  hour: "2-digit", minute: "2-digit", hour12: false,
                })} hrs
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {detail.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-[#1e1e21] rounded-xl border border-gray-200 dark:border-[#202020] p-6 hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <DetailProduct item={item} />
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-transparent dark:to-transparent dark:bg-[#1e1e21] rounded-xl p-6 border border-gray-200 dark:border-[#202020]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
              <FiTrendingUp className="text-green-600 dark:text-green-400 text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Resumen de Venta</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {detail.length} producto{detail.length !== 1 ? 's' : ''} • {totalItems} unidades
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 dark:text-gray-400">Monto Total</p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              S/. {totalAmount.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}