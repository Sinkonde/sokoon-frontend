import { Search, SlidersHorizontal } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ShopsToolbar({
  search,
  statusFilter,
  packageFilter,
  onSearchChange,
  onStatusChange,
  onPackageChange,
  shopCount,
}) {
  const t = useTranslations('shops.list');
  const statusT = useTranslations('shops.status');

  return (
    <div className="border-b border-slate-100 px-4 py-4 sm:px-5 dark:border-slate-800">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold">{t('allShops')}</h2>
          <p className="mt-1 text-xs text-slate-500">{t('browse')}</p>
        </div>
        <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {t('shopCount', { count: shopCount })}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-[minmax(200px,1fr)_160px_160px]">
        <label className="relative block">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={t('searchPlaceholder')}
            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-3 focus:ring-violet-500/10 dark:border-slate-700 dark:bg-slate-900 dark:focus:bg-slate-900"
          />
        </label>

        <label className="relative">
          <SlidersHorizontal
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <select
            value={statusFilter}
            onChange={(event) => onStatusChange(event.target.value)}
            className="h-10 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-600 outline-none focus:border-violet-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
          >
            <option value="All statuses">{t('allStatuses')}</option>
            <option value="Active">{statusT('active')}</option>
            <option value="Pending">{statusT('pending')}</option>
            <option value="Suspended">{statusT('suspended')}</option>
          </select>
        </label>

        <select
          value={packageFilter}
          onChange={(event) => onPackageChange(event.target.value)}
          className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-600 outline-none focus:border-violet-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
        >
          <option value="All packages">{t('allPackages')}</option>
          <option>Starter</option>
          <option>Growth</option>
          <option>Business</option>
        </select>
      </div>
    </div>
  );
}
