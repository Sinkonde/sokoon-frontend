import { CalendarDays, MapPin, MoreHorizontal, Package } from 'lucide-react';
import { useTranslations } from 'next-intl';
import ShopAvatar from './ShopAvatar';
import StatusBadge from './StatusBadge';

export default function ShopMobileCards({ shops, onSelectShop }) {
  const t = useTranslations('shops.list');

  return (
    <div className="space-y-3 p-3 md:hidden">
      {shops?.map((shop) => (
        <article key={shop.id} className="rounded-xl border border-slate-200/80 p-3.5 dark:border-slate-800">
          <div className="flex items-start gap-3">
            <ShopAvatar name={shop.name} />
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold">{shop.name}</h3>
                  <p className="mt-0.5 text-xs text-slate-500">{shop.owner}</p>
                </div>
                <button
                  onClick={() => onSelectShop(shop)}
                  aria-label={t('shopActions', { name: shop.name })}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <MoreHorizontal size={17} />
                </button>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <StatusBadge status={shop.status} />
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {shop.package}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-slate-500">
                {
                  shop.location &&
                  <span className="inline-flex items-center gap-1"><MapPin size={12} />{shop.location}</span>
                }
                
                <span className="inline-flex items-center gap-1"><Package size={12} />{t('productsCount', { count: shop.products })}</span>
                <span className="inline-flex items-center gap-1"><CalendarDays size={12} />{shop.createdAt}</span>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
