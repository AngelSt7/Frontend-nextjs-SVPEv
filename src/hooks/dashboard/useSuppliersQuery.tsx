import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChangeEvent, useRef, useState, useMemo } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useAppStore } from "@/src/store/useAppStore";
import { DashboardQuerySuppliers } from "@/src/services/dashboard/DashboardQuerySuppliers";

export const useSuppliersQuery = () => {
  // Toma el take de estado global
  const take = useAppStore(state => state.take);

  // Verificar si existe o no busqueda
  const [search, setSearch] = useState("");

  // Evitar busqueda inicial
  const prevSearch = useRef("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = useMemo(() => searchParams.get("page") || "1", [searchParams]);
  const paramSearch = searchParams.get("search");

  const searching = useMemo(() => !!paramSearch, [paramSearch]);

  // Funcion de buscar en tiempo real, al primer caracter redirecciona a la primera pagina
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    setSearch(newSearch);

    const params = new URLSearchParams();
    if (newSearch.trim()) {
      params.set("search", newSearch);
      params.set("page", "1");
    } else {
      params.set("page", "1");
    }

    router.push(`/dashboard/suppliers?${params.toString()}`);
  };

  // Query de proveedores para listar, cacheando por proveedores por page y take
  const { data: suppliersList, isFetching } = useQuery({
    queryFn: () => DashboardQuerySuppliers({ page: Number(page), take, search: "" }),
    queryKey: ["suppliers", page, take],
    refetchOnWindowFocus: false,
    retry: false,
    placeholderData: keepPreviousData,
    enabled: !paramSearch, 
  });

  // Query de proveedores para buscar, cacheando por proveedores, busqueda, parametro, page y take
  const { data: suppliersListFilter, isFetching: isFetchingSearch } = useQuery({
    queryFn: () => DashboardQuerySuppliers({ page: 1, take, search: paramSearch || "" }),
    queryKey: ["suppliers", "filtered", paramSearch, page, take],
    refetchOnWindowFocus: false,
    retry: false,
    placeholderData: keepPreviousData,
    enabled: !!paramSearch,
  });

  // Formar datos para la tabla
  const dataTableSuppliers = paramSearch && suppliersListFilter?.empleados 
    ? suppliersListFilter.empleados
    : suppliersList?.empleados;

  return { 
    handleSearch, search, setSearch, searching, page, router,
    dataTableSuppliers, isFetching, isFetchingSearch, suppliersList, suppliersListFilter, paramSearch
  };
};
