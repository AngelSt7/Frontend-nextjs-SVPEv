import { useMemo } from "react";
import { useGetProducts } from "../data/useGetProducts";
import { useGetSuppliers } from "../data/useGetSuppliers";

export const useDataStockForm = () => {
  const { data: products = [] } = useGetProducts();
  const { data: suppliers = [] } = useGetSuppliers();
  const productOptions = useMemo(() => products.filter(p => p.activo === 1).map(p => ({ label: p.nombre, value: p.id })), [products]);
  const suppliersOptions = useMemo(() => suppliers.filter(p => p.activo === 1).map((p) => ({ label: p.razon_social, value: p.id })), [suppliers])

    return {
        productOptions,
        suppliersOptions
    }
}