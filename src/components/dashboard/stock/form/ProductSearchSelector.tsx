import { useState, useEffect } from 'react';
import { ItemOption } from '@/src/types/commonTypes/commonTypes';
import StandaloneSeriesInput from './StandaloneSeriesInput';
import Link from 'next/link';
import { FaRegEye, FaTrash } from 'react-icons/fa';
import { UseFormSetValue, UseFormWatch, UseFormRegisterReturn, FieldError } from 'react-hook-form';
import { ProductWithDetails } from '@/src/types/dashboard/ProductTypes';

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
  const [search, setSearch] = useState('');
  
  // Inicializar desde el watch del formulario
  const [selectedProducts, setSelectedProducts] = useState<ProductWithDetails[]>(() => {
    const watchedValue = watch(name as any);
    return Array.isArray(watchedValue) ? watchedValue.map((p : ProductWithDetails) => ({
      ...p,
      id_producto: p.id_producto.toString(),
      label: data.find(item => item.value.toString() === p.id_producto.toString())?.label || `Producto ${p.id_producto}`
    })) : [];
  });

  // Sincronizar con react-hook-form cada vez que cambie selectedProducts
  useEffect(() => {
    const formattedProducts = selectedProducts.map(product => ({
      id_producto: parseInt(product.id_producto),
      cantidad: product.cantidad,
      precio_unitario: product.precio_unitario,
      tipo_serie: product.tipo_serie,
      series_individuales: product.series_individuales
    }));
    setValue(name as any, formattedProducts as any);
  }, [selectedProducts, setValue, name]);

  // Filtrar productos basado en la búsqueda
  const filtered = data.filter(product => 
    product.label.toLowerCase().includes(search.toLowerCase()) &&
    !selectedProducts.some(selected => selected.id_producto === product.value.toString())
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handleSelectProduct = (product: ItemOption) => {
    const newProduct: ProductWithDetails = {
      id_producto: product.value.toString(),
      label: product.label,
      cantidad: 1,
      precio_unitario: 0,
      tipo_serie: 'SIN_SERIE',
      series_individuales: []
    };
    setSelectedProducts(prev => [...prev, newProduct]);
    setSearch(''); // Limpiar búsqueda después de seleccionar
  };

  const handleRemoveProduct = (productId: string) => {
    setSelectedProducts(prev => prev.filter(product => product.id_producto !== productId));
  };

  const handleUpdateProduct = (productId: string, updates: Partial<ProductWithDetails>) => {
    setSelectedProducts(prev => prev.map(product => {
      if (product.id_producto === productId) {
        const updatedProduct = { ...product, ...updates };
        // Determinar tipo_serie basado en si tiene series
        updatedProduct.tipo_serie = updatedProduct.series_individuales.length > 0 ? 'CON_SERIE' : 'SIN_SERIE';
        return updatedProduct;
      }
      return product;
    }));
  };

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

      {/* Lista de productos filtrados para seleccionar */}
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

      {search.length > 0 && filtered.length === 0 && (
        <p className="text-sm text-gray-500 italic">No se encontraron resultados</p>
      )}

      {/* Lista de productos seleccionados con sus campos */}
      {selectedProducts.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-[#202021] dark:text-[#c5c5c7] mb-4">
            Productos seleccionados:
          </h3>
          <div className="space-y-4">
            {selectedProducts.map((product) => (
              <div
                key={product.id_producto}
                className="p-4 bg-white dark:bg-[#3f3f46] border border-gray-200 dark:border-zinc-600 rounded-lg"
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