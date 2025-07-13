import { useState, useEffect } from 'react';
import { ItemOption } from '@/src/types/commonTypes/commonTypes';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { ProductWithDetails } from '@/src/types/dashboard/ProductTypes';

type UseProductSearchSelectorProps<T extends Record<string, any>> = {
  data: ItemOption[];
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
  name: keyof T;
};

export function useProductSearchSelector<T extends Record<string, any>>({
  data,
  setValue,
  watch,
  name
}: UseProductSearchSelectorProps<T>) {
  const [search, setSearch] = useState('');
  
  const [selectedProducts, setSelectedProducts] = useState<ProductWithDetails[]>(() => {
    const watchedValue = watch(name as any);
    return Array.isArray(watchedValue) ? watchedValue.map((p: ProductWithDetails) => ({
      ...p,
      id_producto: p.id_producto.toString(),
      label: data.find(item => item.value.toString() === p.id_producto.toString())?.label || `Producto ${p.id_producto}`
    })) : [];
  });

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
    setSearch('');
  };

  const handleRemoveProduct = (productId: string) => {
    setSelectedProducts(prev => prev.filter(product => product.id_producto !== productId));
  };

  const handleUpdateProduct = (productId: string, updates: Partial<ProductWithDetails>) => {
    setSelectedProducts(prev => prev.map(product => {
      if (product.id_producto === productId) {
        const updatedProduct = { ...product, ...updates };
        updatedProduct.tipo_serie = updatedProduct.series_individuales.length > 0 ? 'CON_SERIE' : 'SIN_SERIE';
        return updatedProduct;
      }
      return product;
    }));
  };

  return {
    search,
    selectedProducts,
    filtered,
    handleSearchChange,
    handleSelectProduct,
    handleRemoveProduct,
    handleUpdateProduct
  };
}