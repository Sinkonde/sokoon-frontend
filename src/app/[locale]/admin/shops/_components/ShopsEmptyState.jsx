import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ShopsEmptyState() {
  const t = useTranslations('shops.list');

  return (
    <div className="px-4 py-12 text-center">
      <div className="mx-auto grid size-11 place-items-center rounded-xl bg-slate-100 text-slate-400 dark:bg-slate-800">
        <Search size={19} />
      </div>
      <p className="mt-3 text-sm font-semibold">{t('noShops')}</p>
      <p className="mt-1 text-xs text-slate-500">{t('changeSearch')}</p>
    </div>
  );
}
