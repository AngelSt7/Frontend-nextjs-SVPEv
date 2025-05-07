"use client";

import Pagination from "./Pagination";
import NavigationTable from "./NavigationTable";
import { useSuppliersQuery } from "@/src/hooks/dashboard/useSuppliersQuery";
import { useModalUtils } from "@/src/hooks/modal/useModalUtils";
import ModalBase from "@/src/components/ui/ModalBase";
import { TableContent } from "./TableContent";

export default function ContentSuppliers() {
  const { handleSearch, dataTableSuppliers, isFetching, dataTableSuppliersPages } = useSuppliersQuery();
  const { closeModalCreate, openModalCreate } = useModalUtils()

  console.log(dataTableSuppliers)

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
          isFetchingSearch={isFetching}
        />

      </div>

      {dataTableSuppliers && dataTableSuppliers.length > 0 && (
        <div className="mx-auto mt-3 bg-white w-fit px-2 rounded-xl">
          <Pagination total={dataTableSuppliersPages ?? 1} />
        </div>
      )}

      <ModalBase tittle="Agregar proveedor" closeModalCreate={closeModalCreate} />
    </>
  );
}
