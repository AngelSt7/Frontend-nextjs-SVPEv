import { Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { SearchIcon } from "../icons/SearchIcon";
import { ChevronDownIcon } from "../icons/ChevronDownIcon";
import { PlusIcon } from "../icons/PlusIcon";
import { capitalize } from "@/src/utils/format/formatText";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { ColumnsType } from "@/src/types/commonTypes/commonTypes";

interface TopContentProps {
  openModalCreate?: () => void
  filterValue: string;
  setFilterValue: (value: string) => void;
  onSearchChange: (value?: string) => void;
  onClear: () => void;
  statusFilter: string;
  setStatusFilter: Dispatch<SetStateAction<string>>;
  visibleColumns: "all" | Set<string>;
  setVisibleColumns: Dispatch<SetStateAction<"all" | Set<string>>>;
  onRowsPerPageChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  total: number;
  statusOptions: { name: string; uid: string; }[],
  columns: ColumnsType,
  messageButton: string,
  showActions?: boolean,
  entityLabel: string,
}

export const TopContent: React.FC<TopContentProps> = ({ filterValue, onSearchChange, onClear, statusFilter, setStatusFilter, visibleColumns, setVisibleColumns, onRowsPerPageChange, total, openModalCreate, statusOptions, columns, messageButton, showActions = true, entityLabel }) => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Buscar..."
          startContent={<SearchIcon />}
          value={filterValue}
          onClear={onClear}
          onValueChange={onSearchChange}
        />

        <div className="flex gap-3">
          {showActions && (
            <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                Status
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={true}
              selectedKeys={new Set([statusFilter])}
              selectionMode="single"
              onSelectionChange={(keys) => {
                const key = typeof keys === "string" ? keys : String([...keys][0]);
                setStatusFilter(key);
              }}
            >
              {statusOptions.map((status) => (
                <DropdownItem key={status.uid} className="capitalize">
                  {capitalize(status.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          )}
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                Columns
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={visibleColumns}
              selectionMode="multiple"
              onSelectionChange={(keys) => {
                if (keys === "all") {
                  setVisibleColumns("all");
                } else {
                  const stringKeys = new Set([...keys].map(String));
                  setVisibleColumns(stringKeys);
                }
              }}
            >
              {columns.map((column) => (
                <DropdownItem key={column.uid} className="capitalize">
                  {capitalize(column.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          {showActions &&
            <Button className="bg-[#2c2c2c] text-white shadow-lg" endContent={<PlusIcon />} onPress={openModalCreate}>
              {`Agregar ${messageButton}`}
            </Button>
          }
        </div>
      </div>

        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {total} {entityLabel}</span>
          <label className="flex items-center text-default-400 text-small">
            Registros por pagina:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
    </div>
  );
};
