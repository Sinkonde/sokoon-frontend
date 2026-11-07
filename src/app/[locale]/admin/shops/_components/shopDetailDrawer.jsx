'use client';

import { useEffect } from 'react';
import {
  X,
  Store,
  UserRound,
  MapPin,
  Phone,
  CalendarDays,
  Package,
  Globe,
  ExternalLink,
} from 'lucide-react';

export default function ShopDetailsDrawer({ shop, onClose }) {
  useEffect(() => {
    if (!shop) return;

    function onKeyDown(event) {
      if (event.key === 'Escape') onClose();
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [shop, onClose]);

  if (!shop) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <button
        aria-label="Funga maelezo ya duka"
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/45 backdrop-blur-[2px]"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="shop-details-title"
        className="absolute inset-y-0 right-0 flex h-full w-full max-w-lg flex-col border-l border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-[#10131c]"
      >
        <header className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-slate-800">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-violet-600 dark:text-violet-400">
              Shop profile
            </p>
            <h2 id="shop-details-title" className="mt-1 text-base font-bold">
              Maelezo ya duka
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Funga"
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            <X size={19} />
          </button>
        </header>

        <div className="flex-1 space-y-5 overflow-y-auto p-5">
          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/70">
            <div className="flex items-start gap-3">
              <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
                <Store size={21} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="break-words text-base font-bold">{shop.name}</h3>
                <p className="mt-1 text-xs text-slate-500">{shop.id}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-600 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700">
                    {shop.package}
                  </span>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                    {shop.status}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Taarifa za msingi
            </h3>
            <div className="space-y-3">
              <InfoRow icon={UserRound} label="Mmiliki" value={shop.owner} />
              <InfoRow icon={MapPin} label="Eneo" value={shop.location} />
              <InfoRow icon={Phone} label="Simu" value={shop.phone || 'Haijawekwa'} />
              <InfoRow icon={CalendarDays} label="Tarehe ya usajili" value={shop.createdAt} />
              <InfoRow icon={Package} label="Bidhaa" value={`${shop.products} bidhaa`} />
              <InfoRow
                icon={Globe}
                label="Subdomain"
                value={shop.subdomain ? `${shop.subdomain}.duka.tz` : 'Haijawekwa'}
              />
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
            <p className="text-xs font-semibold text-slate-500">Package subscription</p>
            <div className="mt-2 flex items-center justify-between gap-3">
              <span className="text-sm font-bold">{shop.package}</span>
              <span className="text-xs text-slate-500">Taarifa za malipo zitaunganishwa</span>
            </div>
          </section>
        </div>

        <footer className="flex gap-2 border-t border-slate-100 p-4 dark:border-slate-800">
          <button
            onClick={onClose}
            className="h-10 flex-1 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Funga
          </button>
          <button
            type="button"
            className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-violet-600 text-sm font-semibold text-white hover:bg-violet-700"
          >
            Fungua duka
            <ExternalLink size={15} />
          </button>
        </footer>
      </aside>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
        <Icon size={15} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] text-slate-400">{label}</p>
        <p className="mt-0.5 break-words text-sm font-medium text-slate-700 dark:text-slate-200">
          {value}
        </p>
      </div>
    </div>
  );
}