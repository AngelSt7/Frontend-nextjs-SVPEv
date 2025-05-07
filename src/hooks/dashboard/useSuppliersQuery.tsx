import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useMemo, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useAppStore } from "@/src/store/useAppStore";
import { useGetFilters } from "./useGetFilters";
import { dashboardQuerySuppliers } from "@/src/services/dashboard/DashboardQuerySuppliers";

export const useSuppliersQuery = () => {
  const segment = "suppliers";
  const take = useAppStore(state => state.take);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { filtersSuppliers } =  useGetFilters()
  const [search, setSearch] = useState("");

  // Derivar filtros desde los searchParams del URL
  const filters = useMemo(() => filtersSuppliers(searchParams), [searchParams]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    const params = new URLSearchParams(searchParams.toString());
    if (newSearch.trim()) {
      params.set("search", newSearch);
    } else {
      params.delete("search");
    }
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const queryKey = useMemo(() => [segment, "suppliers", filters], [segment, filters]);

  const { data, isFetching } = useQuery({
    queryKey,
    queryFn: () => dashboardQuerySuppliers({ take, ...filters }),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    retry: false,
  });

  return {
    handleSearch,
    search,
    setSearch,
    searching: !!filters.search,
    page: filters.page,
    router,
    dataTableSuppliers: data?.empleados ?? [],
    dataTableSuppliersPages: data?.pages ?? 1,
    isFetching,
    filters,
  };
};
