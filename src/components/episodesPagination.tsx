"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@ui/pagination";
import { cn } from "@utils/mergeClasses";

interface Props {
  currentPage: number;
  totalPages: number;
}

export function EpisodesPagination({ currentPage, totalPages }: Props) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const previousDisabled = currentPage <= 1;
  const nextDisabled = currentPage >= totalPages;

  const disabledClasses = "pointer-events-none opacity-50";

  return (
    <Pagination>
      <PaginationContent className="flex space-x-1">
        <PaginationItem>
          <PaginationPrevious
            href={`/episodes/${currentPage - 1}`}
            aria-disabled={previousDisabled}
            className={cn(previousDisabled && disabledClasses)}
          />
        </PaginationItem>

        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href={`/episodes/${page}`}
              className={page === currentPage ? "bg-gray-800 text-white" : ""}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href={`/episodes/${currentPage + 1}`}
            aria-disabled={nextDisabled}
            className={cn(nextDisabled && disabledClasses)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
