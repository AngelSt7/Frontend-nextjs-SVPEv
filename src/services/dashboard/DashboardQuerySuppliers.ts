import { DashboardSuppliersSchema } from "@/src/schemas/dashboard/Suppliers";
import { supplierQueryParams } from "@/src/utils/format/formatFilters";
import axios, { isAxiosError } from "axios";

type DashboardQuerySuppliersType = {
    page: number;
    take: number;
    search?: string | undefined;
    active?: string | undefined;
    category?: string | undefined;
}

export async function dashboardQuerySuppliers(formData : DashboardQuerySuppliersType ) {
    try {
      const { page, take, ...optionalFilters } = formData;
      const skip = (page - 1) * take;
      const params = supplierQueryParams(skip, take, optionalFilters);
  
      const url = `http://localhost:4000/api/supplier/list?${params.toString()}`;

      const { data } = await axios.get(url);
      const response = DashboardSuppliersSchema.safeParse(data);
      if (response.success) {
        return response.data;
      } 
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error);
      }
    }
  }