export type OptionalFilters = {
    search?: string;
    active?: string;
    category?: string;
  };
  
  export function supplierQueryParams(skip: number, take: number, filters?: OptionalFilters): URLSearchParams {
    const params = new URLSearchParams({
      skip: String(skip),
      take: String(take),
    });
  
    if (filters?.search) params.set("search", filters.search);
    if (filters?.active) params.set("active", filters.active);
    if (filters?.category) params.set("category", filters.category);
  
    return params;
  }
  