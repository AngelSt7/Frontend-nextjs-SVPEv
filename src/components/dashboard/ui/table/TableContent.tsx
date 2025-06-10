import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner } from "@heroui/react";
import { BottomContent } from "./BottomContent";
import { useTableLogic } from "../../../../hooks/dashboard/useTableLogic";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { TopContent } from "./TopContent";
import { useTableHandlers } from "@/src/hooks/dashboard/useTableHandlers";
import { ColumnsType, mutateProps } from "@/src/types/dashboard/commonTypes/commonTypes";

const labelMap: Record<string, string> = {
  suppliers: "Proveedor",
  users: "Usuario",
  products: "Producto",
  categories: "Categoria",
  discounts: "Descuento",
  coupons: "Cupón",
  returns: "Devolución",
  stocks: "Stock",
};

type TableComponentProps<T> = {
  openModalCreate: () => void;
  openModalEdit: (id: number) => void;
  columns: ColumnsType;
  queryKey: string;
  functionService: () => Promise<T[] | undefined>;
  defaultVisibleColumns: (keyof T | string)[];
  searchableField?: keyof T;
  mutate?: mutateProps;
  categoryOptions?: { name: string; uid: string;}[]
  renderCells?: (mutate: mutateProps, item: T, columnKey: React.Key, openModalEdit: (id: number) => void) => any
  showButton?: boolean
};

export const TableComponent = <T extends { id: number }>({
  openModalCreate,
  openModalEdit,
  columns,
  queryKey,
  functionService,
  defaultVisibleColumns,
  searchableField,
  categoryOptions,
  renderCells,
  mutate,
  showButton = true
}: TableComponentProps<T>) => {
  const { data = [], isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: functionService,
    refetchOnWindowFocus: false,
    retry: false,
    placeholderData: keepPreviousData,
  });

  const dataToRender: T[] = data;

  const {
    filterValue, setFilterValue, selectedKeys, setSelectedKeys, visibleColumns,
    setVisibleColumns, statusFilter, setStatusFilter, setRowsPerPage, sortDescriptor,
    setSortDescriptor, page, setPage, headerColumns, filteredItems, sortedItems, pages
  } = useTableLogic({
    data: dataToRender,
    defaultVisibleColumns,
    columns,
    searchableField
  });

  const {
    onSearchChange, onClear, onRowsPerPageChange, onNextPage, onPreviousPage, onSortChange
  } = useTableHandlers({
    setFilterValue, setPage, setRowsPerPage, setStatusFilter, setSortDescriptor,
    page, pages, sortDescriptor,
    validSortColumns: columns.map((column) => column.uid) as Extract<keyof T, string | number>[],
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
      classNames={{ wrapper: "min-h-[222px]" }}
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
          showButton={showButton}
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
            { name: "Inactivo", uid: "inactivo" },
          ]}
          columns={columns}
          messageButton={labelMap[queryKey] || "Elemento"}
        />
      }
      topContentPlacement="outside"
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid.toString()}
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
          <TableRow className="hover:bg-[#f3f4f6]" key={item.id}>
            {(columnKey) => (
              <TableCell>
                {renderCells?.(mutate!, item, columnKey, openModalEdit)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
