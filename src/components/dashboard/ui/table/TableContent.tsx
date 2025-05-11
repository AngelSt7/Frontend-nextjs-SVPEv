import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner } from "@heroui/react";
import { BottomContent } from "./BottomContent";
import { renderCell } from "../../proveedores/list/RenderCell";
import { useTableLogic } from "../../../../hooks/dashboard/useTableLogic";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { dashboardListSupplierService } from "@/src/services/dashboard/Supplier/dashboardListSupplierService";
import { DashboardSupplier } from "@/src/types/DashboardTypes";
import { Columns } from "../../proveedores/list/Columns";
import { TopContent } from "./TopContent";
import { useTableHandlers } from "@/src/hooks/dashboard/useTableHandlers";

type TableComponentProps = {
  openModalCreate: () => void;
  openModalEdit: (id: number) => void;
};

export const TableComponent = ({ openModalCreate, openModalEdit }: TableComponentProps) => {
  // Obtener los proveedores y cachear los datos
  const { data = { content: [] }, isLoading } = useQuery({
    queryKey: ["suppliers"],
    queryFn: dashboardListSupplierService,
    refetchOnWindowFocus: false,
    retry: false,
    placeholderData: keepPreviousData,
  });

  // Declarar array inicial
  const suppliers = data.content || [];

  //*** 
  // useTableLogic requiere 5 props
  // data: (declarada justo arriba, es el array de proveedores, que inicalmene es un array vacio de carga))
  // defaultVisibleColumns: (columnas que deseas mostrar pode defecto, en este caso razon social, ruc, correo, activo y actions))
  // columns: (declarar un array de columnas como en el import de la linea "10" de arriba))
  // searchableField: (columna de busqueda, en este caso razon_social o la que quieras))
  // statusField: (activar los filtros de activo o inactivo))
  //  */

  const { filterValue, setFilterValue, selectedKeys, setSelectedKeys, visibleColumns, setVisibleColumns, statusFilter, setStatusFilter, setRowsPerPage, sortDescriptor, setSortDescriptor, page, setPage, headerColumns, filteredItems, sortedItems, pages } = useTableLogic({
    data: suppliers, //datos del query
    defaultVisibleColumns: ["razon_social", "ruc", "correo", "activo", "actions"], //columnas que deseas mostrar
    columns: Columns, //arreglo de columnas
    searchableField: "razon_social", //columna de busqueda
    statusField: "activo", //activar los filtros de activo o inactivo
  });

  const { onSearchChange, onClear, onRowsPerPageChange, onNextPage, onPreviousPage, onSortChange } = useTableHandlers<DashboardSupplier>({
    setFilterValue, setPage, setRowsPerPage, setStatusFilter, setSortDescriptor,
    page, pages, sortDescriptor,
    validSortColumns: [
      "id", "razon_social", "ruc", "correo", "direccion", "telefono", "celular", "activo"
    ] // la unica importante es esta, pasarle las columnas validas, igual a las que definiste en columns
  });


  return (
    <Table
      isCompact
      aria-label="Custom table using hook logic"
      bottomContent={
        <BottomContent
          page={page}
          pages={pages}
          onPreviousPage={onPreviousPage}
          onNextPage={onNextPage}
          onRowsPerPageChange={onRowsPerPageChange}
          onSetPage={setPage}
        />
      }
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "min-h-[222px]",
      }}
      selectedKeys={selectedKeys}
      sortDescriptor={sortDescriptor}
      onSortChange={onSortChange}
      onSelectionChange={(keys) => {
        const newKeys =
          typeof keys === "string"
            ? new Set([keys])
            : new Set([...keys].map(String));
        setSelectedKeys(newKeys);
      }}
      topContent={
        <TopContent
          filterValue={filterValue}
          setFilterValue={setFilterValue}
          onSearchChange={onSearchChange}
          onClear={onClear}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          visibleColumns={visibleColumns}
          setVisibleColumns={setVisibleColumns}
          onRowsPerPageChange={onRowsPerPageChange}
          total={filteredItems.length}
          openModalCreate={openModalCreate}
          statusOptions={[
            { name: "Todos", uid: "all" },
            { name: "Activo", uid: "activo" },
            { name: "Inactivo", uid: "inactivo" }
          ]}
          columns={Columns}
        />
      }
      topContentPlacement="outside"
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody
        items={sortedItems}
        isLoading={isLoading}
        loadingContent={<Spinner />}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey, openModalEdit)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table >
  );
};
