"use client";

import Pagination from "./Pagination";
import NavigationTable from "./InputSearch";
import { useSuppliersQuery } from "@/src/hooks/dashboard/useSuppliersQuery";
import { useModalUtils } from "@/src/hooks/modal/useModalUtils";
import ModalBase from "@/src/components/ui/ModalBase";
import { TableContent } from "./TableContent";

export default function ContentSuppliers() {
  const { handleSearch, dataTableSuppliers, isFetching, isFetchingSearch, suppliersList, suppliersListFilter, paramSearch } = useSuppliersQuery();
  const { closeModalCreate, openModalCreate } = useModalUtils()

  return (
    <>
      <div className=" space-y-5 ">
        <div className=" bg-[#f1f1f1] px-4 py-4">
          <NavigationTable
            handleSearch={handleSearch}
            openModalCreate={openModalCreate}
          />
        </div>

        <TableContent
          dataTableSuppliers={dataTableSuppliers || []}
          isFetching={isFetching}
          isFetchingSearch={isFetchingSearch}
        />

      </div>

      {suppliersList && suppliersList.empleados.length > 0 && (
        <div className="mx-auto mt-3 bg-white w-fit px-2 rounded-xl">
          <Pagination total={paramSearch ? suppliersListFilter?.pages || 1 : suppliersList?.pages || 1} />
        </div>
      )}

      <ModalBase tittle="Agregar proveedor" closeModalCreate={closeModalCreate} />
    </>
  );
}
