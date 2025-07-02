import { useAppStore } from '@/src/store/useAppStore'
import { FiTrendingUp } from 'react-icons/fi'
import DetailItem from './DetailItem'

export default function DetailsReturnProducts() {
  const detail = useAppStore(state => state.detailReturn)
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <FiTrendingUp className="text-blue-600 dark:text-blue-400 text-xl" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Productos
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {detail.length} producto{detail.length !== 1 ? 's' : ''} devuelto{detail.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>
      
      <div className="space-y-4">
        {detail.map((item, index) => (
          <DetailItem
            key={`${item.id_producto}-${index}`}
            item={item}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}