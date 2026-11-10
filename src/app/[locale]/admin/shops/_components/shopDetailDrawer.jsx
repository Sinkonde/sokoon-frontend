
'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import {
  X,
  Store,
  UserRound,
  MapPin,
  Phone,
  CalendarDays,
  Package,
  Globe,
  ArrowUpRight,
  CreditCard,
  CheckCircle2,
  Hash,
  Sparkles,
} from 'lucide-react';

export default function ShopDetailsDrawer({ shop, onClose }) {
  const t = useTranslations('shop');

  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [activeShop, setActiveShop] = useState(shop);
  const [isCompact, setIsCompact] = useState(false);

  // Drawer entrance and exit animation
  useEffect(() => {
    let timer;

    if (shop) {
      setActiveShop(shop);
      setMounted(true);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    } else {
      setVisible(false);
      setIsCompact(false);

      timer = setTimeout(() => {
        setMounted(false);
        setActiveShop(null);
      }, 350);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [shop]);

  // Escape key
  useEffect(() => {
    if (!mounted) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [mounted, onClose]);

  if (!mounted || !activeShop) return null;

  const shopData = activeShop;

  const statusActive =
    String(shopData.status).toLowerCase() === 'active' ||
    String(shopData.status).toLowerCase() === 'hai';

  const infoItems = [
    {
      icon: UserRound,
      label: t('owner'),
      value: shopData.owner || t('notSet'),
    },
    {
      icon: Phone,
      label: t('phone'),
      value: shopData.phone || t('notSet'),
    },
    {
      icon: MapPin,
      label: t('location'),
      value: shopData.location || t('notSet'),
    },
    {
      icon: CalendarDays,
      label: t('registrationDate'),
      value: shopData.createdAt || t('notSet'),
    },
  ];

  return (
    <div className="fixed inset-0 z-[100]">

      {/* Backdrop */}
      <button
        type="button"
        aria-label={t('closeDetails')}
        onClick={onClose}
        className={`absolute inset-0 h-full w-full bg-slate-950/50 backdrop-blur-sm transition-all duration-300 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="shop-details-title"
        className={`absolute inset-y-0 right-0 flex h-full w-full max-w-[480px] flex-col overflow-hidden border-l border-slate-200/70 bg-[#f8f9fc] shadow-[-20px_0_70px_rgba(0,0,0,0.15)] transition-transform duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] dark:border-slate-800 dark:bg-[#0d111b] ${
          visible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >

        {/* HEADER */}
        <header
          className={`relative z-10 shrink-0 overflow-hidden bg-[#17152d] text-white transition-all duration-300 ease-in-out ${
            isCompact ? 'pb-3 pt-3' : 'pb-6 pt-5'
          }`}
        >
          <div
            className={`pointer-events-none absolute -right-12 rounded-full bg-violet-500/20 blur-3xl transition-all duration-500 ${
              isCompact
                ? '-top-24 size-32 opacity-0'
                : '-top-20 size-64 opacity-100'
            }`}
          />

          <div className="relative flex items-center justify-between px-6">
            <div className="flex min-w-0 items-center gap-3">

              {!isCompact && (
                <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-white/10 ring-1 ring-white/10">
                  <Store size={16} />
                </div>
              )}

              <div className="min-w-0">
                {!isCompact && (
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-violet-300">
                    {t('profile')}
                  </p>
                )}

                <h2
                  id="shop-details-title"
                  className={`truncate font-bold tracking-tight transition-all duration-300 ${
                    isCompact ? 'text-sm' : 'text-xl'
                  }`}
                >
                  {shopData.name}
                </h2>

                {!isCompact && (
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-white/50">
                    <Hash size={12} />
                    {shopData.id}
                  </p>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label={t('close')}
              className="grid size-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition hover:rotate-90 hover:bg-white/15 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* Package and status */}
          <div
            className={`relative flex flex-wrap items-center gap-2 overflow-hidden px-6 transition-all duration-300 ${
              isCompact
                ? 'mt-0 max-h-0 translate-y-[-8px] opacity-0'
                : 'mt-5 max-h-12 translate-y-0 opacity-100'
            }`}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-white/90">
              <CreditCard size={12} />
              {shopData.package}
            </span>

            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold ${
                statusActive
                  ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300'
                  : 'border-amber-400/20 bg-amber-400/10 text-amber-300'
              }`}
            >
              <span
                className={`size-1.5 rounded-full ${
                  statusActive ? 'bg-emerald-400' : 'bg-amber-400'
                }`}
              />
              {statusActive ? t('status.active') : t('status.inactive')}
            </span>
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <div
          onScroll={(e) => {
            setIsCompact(e.currentTarget.scrollTop > 35);
          }}
          className="scrollbar-none flex-1 overflow-y-auto overscroll-contain px-5 py-5"
        >

          {/* Quick stats */}
          <section className="grid grid-cols-2 gap-3">

            <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-200/30 dark:border-slate-800 dark:bg-[#151b29] dark:shadow-none">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  {t('products')}
                </span>

                <span className="grid size-8 place-items-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-300">
                  <Package size={16} />
                </span>
              </div>

              <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {shopData.products ?? 0}
              </p>

              <p className="mt-0.5 text-[10px] text-slate-400">
                {t('totalProducts')}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-200/30 dark:border-slate-800 dark:bg-[#151b29] dark:shadow-none">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  {t('subscription')}
                </span>

                <span className="grid size-8 place-items-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
                  <CheckCircle2 size={16} />
                </span>
              </div>

              <p className="mt-2 truncate text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                {shopData.package}
              </p>

              <p className="mt-0.5 text-[10px] text-slate-400">
                {t('currentPackage')}
              </p>
            </div>

          </section>

          {/* Basic information */}
          <section className="mt-7">

            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {t('basicInformation')}
                </h3>

                <p className="mt-0.5 text-[11px] text-slate-400">
                  {t('importantInformation')}
                </p>
              </div>

              <span className="rounded-lg bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                {t('details')}
              </span>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-[#151b29]">
              {infoItems.map((item, index) => (
                <InfoRow
                  key={item.label}
                  {...item}
                  last={index === infoItems.length - 1}
                />
              ))}
            </div>

          </section>

          {/* Online store */}
          <section className="mt-6">

            <div className="mb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {t('onlineStore')}
              </h3>

              <p className="mt-0.5 text-[11px] text-slate-400">
                {t('onlineStoreDescription')}
              </p>
            </div>

            <div className="rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-indigo-50/70 p-4 dark:border-violet-500/15 dark:from-violet-500/[0.08] dark:to-indigo-500/[0.04]">
              <div className="flex items-center gap-3">

                <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-violet-600 shadow-sm dark:bg-violet-500/10 dark:text-violet-300">
                  <Globe size={19} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
                    {t('subdomain')}
                  </p>

                  <p className="mt-0.5 break-all text-sm font-semibold text-slate-800 dark:text-slate-100">
                    {shopData.subdomain
                      ? `${shopData.subdomain}.duka.tz`
                      : t('notSet')}
                  </p>
                </div>

              </div>
            </div>
          </section>

          {/* Package subscription */}
          <section className="mb-2 mt-6 rounded-2xl border border-slate-200/80 bg-white p-4 dark:border-slate-800 dark:bg-[#151b29]">

            <div className="flex items-center gap-2">

              <div className="grid size-8 place-items-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300">
                <CreditCard size={15} />
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-800 dark:text-white">
                  {t('subscription')}
                </h3>

                <p className="text-[10px] text-slate-400">
                  {t('paymentInformationPending')}
                </p>
              </div>

            </div>
          </section>

        </div>

        {/* FOOTER */}
        <footer className="flex shrink-0 gap-3 border-t border-slate-200/80 bg-white/90 px-5 py-4 backdrop-blur-xl dark:border-slate-800 dark:bg-[#101622]/95">

          <button
            type="button"
            onClick={onClose}
            className="h-11 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 active:scale-[0.98] dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {t('close')}
          </button>

          <button
            type="button"
            className="group inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-600/25 active:translate-y-0 active:scale-[0.98]"
          >
            {t('openShop')}

            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </button>

        </footer>

      </aside>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value, last }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3.5 ${
        last ? '' : 'border-b border-slate-100 dark:border-slate-800'
      }`}
    >
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-slate-50 text-slate-500 dark:bg-slate-800/80 dark:text-slate-400">
        <Icon size={16} />
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-medium text-slate-400">
          {label}
        </p>

        <p className="mt-0.5 break-words text-[13px] font-semibold text-slate-700 dark:text-slate-200">
          {value}
        </p>
      </div>
    </div>
  );
}
