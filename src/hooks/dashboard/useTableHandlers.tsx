import { Dispatch, SetStateAction, useCallback } from "react";
import { SortDescriptor } from "@heroui/react";
import { SortKey } from "./useTableLogic";

type useTableHandlersProps<T extends object> = {
  setFilterValue: (v: string) => void;
  setPage: (p: number) => void;
  setRowsPerPage: (v: number) => void;
  setStatusFilter: (v: string) => void;
  setSortDescriptor: Dispatch<SetStateAction<{
    column: SortKey<T>;
    direction: "ascending" | "descending";
  }>>;
  page: number;
  pages: number;
  sortDescriptor: {
    column: SortKey<T>;
    direction: "ascending" | "descending";
  };
  validSortColumns: Array<SortKey<T>>;
};
export function useTableHandlers<T extends object>({
  setFilterValue,
  setPage,
  setRowsPerPage,
  setStatusFilter,
  setSortDescriptor,
  page,
  pages,
  sortDescriptor,
  validSortColumns
}: useTableHandlersProps<T>) {

  const onSearchChange = useCallback((value?: string) => {
    setFilterValue(value || "");
    setPage(1);
  }, [setFilterValue, setPage]);

  const onClear = useCallback(() => {
    setFilterValue("");
    setStatusFilter("all");
    setPage(1);
  }, [setFilterValue, setStatusFilter, setPage]);

  const onRowsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, [setRowsPerPage, setPage]);

  const onNextPage = useCallback(() => {
    if (page < pages) setPage(page + 1);
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) setPage(page - 1);
  }, [page]);

  type ValidColumn = Extract<keyof T, string | number>;

  const onSortChange = useCallback((descriptor: SortDescriptor) => {
    const column = descriptor.column as SortKey<T>;
    if (validSortColumns.includes(column)) {
      setSortDescriptor({
        column,
        direction: descriptor.direction,
      });
    }
  }, [setSortDescriptor, validSortColumns]);

  return {
    onSearchChange,
    onClear,
    onRowsPerPageChange,
    onNextPage,
    onPreviousPage,
    onSortChange,
  };
}
