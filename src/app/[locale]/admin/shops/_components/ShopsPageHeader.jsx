import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ShopsPageHeader({ onAddShop }) {
  const t = useTranslations('shops');

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-600 dark:text-violet-400">
          {t('platformManagement')}
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">{t('title')}</h1>
        <p className="mt-1 text-sm text-slate-500">{t('description')}</p>
      </div>

      <button
        type="button"
        onClick={onAddShop}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 text-sm font-semibold text-white shadow-sm shadow-violet-600/20 transition hover:bg-violet-700 active:scale-[0.98]"
      >
        <Plus size={17} />
        {t('addShop')}
      </button>
    </div>
  );
}
