import { MoreHorizontal } from 'lucide-react';
import { useTranslations } from 'next-intl';
import ShopAvatar from './ShopAvatar';
import StatusBadge from './StatusBadge';

export default function ShopsTable({ shops, onSelectShop }) {
  const t = useTranslations('shops.list');

  return (
    <div className="hidden overflow-x-auto md:block">
      <table className="w-full min-w-[760px] text-left">
        <thead className="bg-slate-50/80 text-[11px] uppercase tracking-wide text-slate-400 dark:bg-slate-900/70">
          <tr>
            <th className="px-5 py-3 font-semibold">{t('shop')}</th>
            <th className="px-4 py-3 font-semibold">{t('package')}</th>
            <th className="px-4 py-3 font-semibold">{t('products')}</th>
            <th className="px-4 py-3 font-semibold">{t('status')}</th>
            <th className="px-4 py-3 font-semibold">{t('created')}</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {shops?.map((shop) => (
            <tr key={shop.id} className="transition hover:bg-slate-50/70 dark:hover:bg-slate-900/50">
              <td className="px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <ShopAvatar name={shop.name} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{shop.name}</p>
                    <p className="mt-0.5 truncate text-xs text-slate-500">
                      {shop.owner} · {shop.id}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3.5">
                <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {shop.package}
                </span>
              </td>
              <td className="px-4 py-3.5 text-sm text-slate-600 dark:text-slate-300">{shop.products}</td>
              <td className="px-4 py-3.5"><StatusBadge status={shop.status} /></td>
              <td className="px-4 py-3.5 text-xs text-slate-500">{shop.createdAt}</td>
              <td className="px-4 py-3.5 text-right">
                <button
                  type="button"
                  aria-label={t('shopDetails', { name: shop.name })}
                  onClick={() => onSelectShop(shop)}
                  className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                >
                  <MoreHorizontal size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
