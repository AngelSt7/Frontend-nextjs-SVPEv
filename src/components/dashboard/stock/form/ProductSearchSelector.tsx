import { ItemOption } from '@/src/types/commonTypes/commonTypes';
import Link from 'next/link';
import { FaRegEye } from 'react-icons/fa';
import { UseFormSetValue, UseFormWatch, UseFormRegisterReturn, FieldError } from 'react-hook-form';
import { useProductSearchSelector } from '@/src/hooks/dashboard/ui/useProductSearchSelector';
import SelectedProduct from './SelectedProduct';

type ProductSearchSelectorProps<T extends Record<string, any>> = {
  data: ItemOption[]
  label?: string
  view: string
  setValue: UseFormSetValue<T>
  watch: UseFormWatch<T>
  register: UseFormRegisterReturn
  name: keyof T
  errorMessage?: FieldError
}

export default function ProductSearchSelector<T extends Record<string, any>>({
  data,
  label,
  view,
  setValue,
  watch,
  register,
  name,
  errorMessage
}: ProductSearchSelectorProps<T>) {

    const {
    search,
    selectedProducts,
    filtered,
    handleSearchChange,
    handleSelectProduct,
    handleRemoveProduct,
    handleUpdateProduct
  } = useProductSearchSelector({ data, setValue, watch, name });

  return (
    <div className="flex flex-col gap-4">
      <input type="hidden" {...register} />
      
      <div className='flex justify-between items-center'>
        <label className="text-base font-semibold text-[#202021] dark:text-[#c5c5c7]">
          {`Buscar ${label}`}
        </label>
        <Link
          target="_blank"
          prefetch
          title="Obtener ayuda"
          className="text-[#202021] text-base dark:text-[#c5c5c7]"
          href={view}
        >
          <FaRegEye />
        </Link>
      </div>

      <input
        className={`text-sm block w-full h-[50px] p-2 border ${errorMessage ? 'border-[#d10b30]' : 'border-[#afaeae] dark:border-[#3f3f46]'} bg-[#f4f4f5] hover:bg-[#e4e4e7] dark:bg-[#242428] dark:hover:bg-[#3f3f46] rounded-md outline-none focus:ring-1 ${errorMessage ? 'ring-[#d10b30]' : 'focus:ring-white/10'}`}
        type="text"
        placeholder="Ingrese su búsqueda"
        onChange={(e) => handleSearchChange(e.target.value)}
        value={search}
      />

      {filtered.length > 0 && search.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {filtered.slice(0, 5).map((product) => (
            <button
              key={product.value}
              type="button"
              onClick={() => handleSelectProduct(product)}
              className="px-4 py-2 rounded-full text-sm font-medium border transition bg-gray-100 dark:bg-[#6f6991] dark:text-zinc-100 dark:border-zinc-600 dark:hover:bg-[#8b86a8] text-gray-700 border-gray-300 hover:bg-gray-200 active:bg-gray-300"
            >
              {product.label}
            </button>
          ))}
        </div>
      )}

      {(search.length > 0 && filtered.length === 0) && (
        <p className="text-sm text-gray-500 italic">No se encontraron resultados</p>
      )}

      {selectedProducts.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-[#202021] dark:text-[#c5c5c7] mb-4">
            Productos seleccionados:
          </h3>
          <div className="space-y-4">
            {selectedProducts.map((product) => (
              <SelectedProduct
                product={product}
                handleRemoveProduct={handleRemoveProduct}
                handleUpdateProduct={handleUpdateProduct}
              />
            ))}
          </div>
        </div>
      )}
      
      {errorMessage && (
        <span className="text-xs text-[#d10b30] font-medium">{errorMessage.message}</span>
      )}
    </div>
  );
}