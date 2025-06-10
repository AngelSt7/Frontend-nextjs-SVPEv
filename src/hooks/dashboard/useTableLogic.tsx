import { useMemo, useState } from "react";

export type ColumnDefinition<T> = {
  uid: keyof T | string;
  name: string;
  sortable?: boolean;
};

export type SortKey<T> = Extract<keyof T, string | number>;

type useTableLogicProps<T> = {
  data: T[];
  defaultVisibleColumns: (keyof T | string)[];
  columns: ColumnDefinition<T>[];
  searchableField?: keyof T;
};



export const useTableLogic = <T extends { id: number | string }>({
  data,
  defaultVisibleColumns,
  columns,
  searchableField,
}: useTableLogicProps<T>) => {

  const statusField = "activo" as keyof T;
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [visibleColumns, setVisibleColumns] = useState<"all" | Set<string>>(
    new Set(defaultVisibleColumns.map(String))
  );
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState<{
    column: SortKey<T>;
    direction: 'ascending' | 'descending';
  }>({
    column: defaultVisibleColumns[0] as SortKey<T>,
    direction: 'ascending',
  });
  const [page, setPage] = useState(1);
  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid as string)
    );
  }, [visibleColumns, columns]);

  const filteredItems = useMemo(() => {
    let filtered = [...data];

    if (hasSearchFilter && searchableField) {
      filtered = filtered.filter((item) =>
        String(item[searchableField])
          .toLowerCase()
          .includes(filterValue.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      const statusValue = statusFilter === "activo" ? 1 : 0;

      filtered = filtered.filter((item) => {
        return statusField in item
          ? Number(item[statusField]) === statusValue
          : true;
      });
    }

    return filtered;
  }, [filterValue, statusFilter, data, searchableField]);


  const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1;
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredItems.slice(start, start + rowsPerPage);
  }, [page, filteredItems, rowsPerPage]);


  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  return {
    filterValue, setFilterValue, selectedKeys, setSelectedKeys, visibleColumns, setVisibleColumns,
    statusFilter, setStatusFilter, rowsPerPage, setRowsPerPage, sortDescriptor, setSortDescriptor,
    page, setPage, headerColumns, filteredItems, sortedItems, pages,
  };
};
