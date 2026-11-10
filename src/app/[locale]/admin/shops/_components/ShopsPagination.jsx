import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ShopsPagination({
  totalItems,
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
}) {
  const t = useTranslations('shops.list');

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-4 py-3.5 dark:border-slate-800 sm:px-5">
      <p className="text-xs text-slate-500">
        {t('showing')}{' '}
        <span className="font-semibold text-slate-700 dark:text-slate-200">
          {totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1}
          {'–'}
          {Math.min(currentPage * pageSize, totalItems)}
        </span>{' '}
        {t('of')} {totalItems}
      </p>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="grid size-8 place-items-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:hover:bg-slate-800"
          aria-label={t('previousPage')}
        >
          <ChevronLeft size={16} />
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`grid size-8 place-items-center rounded-lg text-xs font-semibold ${
              pageNumber === currentPage
                ? 'bg-violet-600 text-white'
                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {pageNumber}
          </button>
        ))}

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="grid size-8 place-items-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:hover:bg-slate-800"
          aria-label={t('nextPage')}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
