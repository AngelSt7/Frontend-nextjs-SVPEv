import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner } from "@heroui/react";
import { BottomContent } from "./BottomContent";
import { useTableLogic } from "../../../../hooks/dashboard/useTableLogic";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { TopContent } from "./TopContent";
import { useTableHandlers } from "@/src/hooks/dashboard/useTableHandlers";
import { ColumnsType } from "@/src/types/commonTypes/commonTypes";
import { entityLabelMap, labelMap } from "@/src/utils/resolves/resolveTittle";

type TableComponentProps<T> = {
  columns: ColumnsType;
  queryKey: string;
  defaultVisibleColumns: (keyof T | string)[];
  functionService: () => Promise<T[] | undefined>;
  newPath?: string
  searchableField?: keyof T;
  categoryOptions?: { name: string; uid: string; }[]
  showActions?: boolean,
  isSales?: boolean,
  openModalCreate?: () => void;
  renderCells?: (item: T, columnKey: React.Key) => React.ReactNode;
  renderCellsCart?: (item: T, columnKey: React.Key) => React.ReactNode;
};

export const TableComponent = <T extends { id: number }>({
  openModalCreate, columns, queryKey,
  functionService, defaultVisibleColumns, searchableField,
  renderCells, renderCellsCart, showActions = true, 
  isSales = false, newPath
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
    filterValue, setFilterValue, selectedKeys, setSelectedKeys, visibleColumns, setVisibleColumns, statusFilter, setStatusFilter, setRowsPerPage, sortDescriptor, setSortDescriptor, page, setPage, headerColumns, filteredItems, sortedItems, pages
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
          newPath={newPath}
          showActions={showActions}
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
          openModalCreate={openModalCreate!}
          statusOptions={[
            { name: "Todos", uid: "all" },
            { name: "Activo", uid: "activo" },
            { name: "Inactivo", uid: "inactivo" },
          ]}
          columns={columns}
          messageButton={labelMap[queryKey] || "Elemento"}
          entityLabel={entityLabelMap[queryKey] || "elementos"}
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

      {!isSales ? (
        <TableBody
          emptyContent="No se encontraron registros"
          items={sortedItems}
          isLoading={isLoading}
          loadingContent={<Spinner />}
        >
          {(item) => (
            <TableRow className="hover:bg-[#f3f4f6] dark:hover:bg-[#222225] dark:text-[#c9cacb]" key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {renderCells?.(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      ) : (
        <TableBody
          items={sortedItems}
          isLoading={isLoading}
          loadingContent={<Spinner />}
        >
          {(item) => (
            <TableRow className="hover:bg-[#f3f4f6] dark:hover:bg-[#222225] dark:text-[#c9cacb]" key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {renderCellsCart?.( item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      )}
    </Table>
  );
};