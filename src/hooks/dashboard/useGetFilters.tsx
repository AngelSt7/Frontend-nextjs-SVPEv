type SupplierFilters = {
    page: number;
    search?: string;
    active?: string;
    category?: string;
};

type OptionalFilters = {
    search?: string;
    active?: string;
    category?: string;
  };

export function useGetFilters() {

    // Obtener todos los filtros existentes de los proveedores
    // Los filtos opcinales son undefined
    const filtersSuppliers = (params: URLSearchParams): SupplierFilters => {
        const page = Number(params.get("page") || "1");
        const search = params.get("search") || undefined;
        const active = params.get("active") || undefined;
        const category = params.get("category") || undefined;

        return {
            page,
            ...(search && { search }),
            ...(active && { active }),
            ...(category && { category }),
        };
    };

    return {
        filtersSuppliers
    }
}
