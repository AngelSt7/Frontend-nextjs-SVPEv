import { useMemo, useState } from "react";

type ColumnDefinition<T> = {
  uid: keyof T | string;
  name: string;
  sortable?: boolean;
};

type useTableLogicProps<T> = {
  data: T[];
  defaultVisibleColumns: (keyof T | string)[];
  columns: ColumnDefinition<T>[];
  searchableField?: keyof T;  
  statusField?: keyof T;
};

export const useTableLogic = <T extends { id: number | string }>({ data, defaultVisibleColumns, columns, searchableField, statusField}: useTableLogicProps<T>) => {

  // Filtrar por algun string
  const [filterValue, setFilterValue] = useState("");

  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

  // Columnas visibles
  const [visibleColumns, setVisibleColumns] = useState<"all" | Set<string>>(
    new Set(defaultVisibleColumns.map(String))
  );

  // Array filtrado
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Filas por pagina (falta usar el app store)
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Ordenador de columnas
  const [sortDescriptor, setSortDescriptor] = useState<{
    column: keyof T;
    direction: "ascending" | "descending";
  }>({
    column: defaultVisibleColumns[0] as keyof T,
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  // ¿Se esta filtrando?
  const hasSearchFilter = Boolean(filterValue);

  // Ver que columnas mostrar
  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid as string)
    );
  }, [visibleColumns, columns]);

  // Filtrador
  const filteredItems = useMemo(() => {
    let filtered = [...data];
    if (hasSearchFilter && searchableField) {
      filtered = filtered.filter((item) =>
        String(item[searchableField])
          .toLowerCase()
          .includes(filterValue.toLowerCase())
      );
    }
    if (statusField && statusFilter !== "all") {
      const statusValue = statusFilter === "activo" ? 1 : 0;
      filtered = filtered.filter(
        (item) => Number(item[statusField]) === statusValue
      );
    }
    return filtered;
  }, [filterValue, statusFilter, data, searchableField, statusField]);

  // Calculador de paginas
  const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1;

  // Items en si
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredItems.slice(start, start + rowsPerPage);
  }, [page, filteredItems, rowsPerPage]);

  // Ordenador de items
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
