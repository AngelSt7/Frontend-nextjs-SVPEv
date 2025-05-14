import React from "react";
import { Pagination, Button } from "@heroui/react";

interface Props {
  page: number;
  pages: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onSetPage: (p: number) => void;
  onRowsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const BottomContent: React.FC<Props> = ({ page, pages, onPreviousPage, onNextPage, onSetPage}) => {
  return (
    <div className="py-2 px-2 flex justify-between items-center">
      <span className="w-[30%] text-small text-default-400">
        Rows per page
      </span>
      <Pagination
        isCompact
        showControls
        showShadow
        color="warning"
        page={page}
        total={pages}
        onChange={onSetPage}
      />
      <div className="hidden sm:flex w-[30%] justify-end gap-2">
        <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
          Anterior
        </Button>
        <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
          Siguiente
        </Button>
      </div>
    </div>
  );
};
