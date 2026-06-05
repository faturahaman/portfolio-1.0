import { ChevronLeft, ChevronRight } from "lucide-react"
import { buildPageNumbers } from "@/lib/github-utils"

interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  const btnBase =
    "w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 hover:text-black dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"

  return (
    <div className="mt-10 flex items-center justify-center gap-1">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
        className={btnBase}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {buildPageNumbers(page, totalPages).map((p, i) =>
        p === "…" ? (
          <span
            key={`ellipsis-${i}`}
            className="w-9 h-9 flex items-center justify-center text-sm text-gray-400 dark:text-gray-600 select-none"
          >
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            aria-label={`Page ${p}`}
            aria-current={p === page ? "page" : undefined}
            className={
              p === page
                ? "w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium bg-black dark:bg-white text-white dark:text-black transition-all"
                : `w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium ${btnBase}`
            }
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
        className={btnBase}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
}
