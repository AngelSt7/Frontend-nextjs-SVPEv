"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Pagination as PaginationHero } from "@heroui/pagination";
import { DashboardPaginationType } from "@/src/types/DashboardTypes";

type PaginationProps = {
  total: number,
}

export default function Pagination({ total }: Pick<PaginationProps, 'total'>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePageChange = (page: DashboardPaginationType['page']) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <PaginationHero
      size="sm"
      isCompact
      color="warning"
      loop
      showControls
      total={total}
      page={currentPage}
      onChange={handlePageChange}
    />
  );
}
