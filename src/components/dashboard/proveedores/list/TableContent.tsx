import React, { memo } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner } from "@heroui/react";
import { columns } from "./Columns";
import RenderCell from "./RenderCell";
import { DashboardSupplier } from "@/src/types/DashboardTypes";

type TableContentProps = {
    dataTableSuppliers: DashboardSupplier[];
    isFetching: boolean;
    isFetchingSearch: boolean;
};

export const TableContent = memo(function TableContent({ dataTableSuppliers, isFetching, isFetchingSearch} : TableContentProps) {

    return (
        <Table className="px-5">
            <TableHeader columns={columns} className="flex justify-center">
                {(column) => (
                    <TableColumn key={column.uid} align={column.uid === "location" ? "start" : "center"}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>

            <TableBody
                items={dataTableSuppliers ?? []}
                loadingContent={<Spinner />}
                loadingState={isFetching || isFetchingSearch ? "loading" : "idle"}
                emptyContent={dataTableSuppliers.length === 0 && "No se encontraron resultados"}
            >
                {(item) => (
                    <TableRow key={item.id} className="hover:bg-[#F7F7F7]">
                        {(columnKey) => (
                            <TableCell>
                                <RenderCell supplier={item} columnKey={columnKey} />
                            </TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
});