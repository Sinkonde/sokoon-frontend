
'use client';

import { useState, useEffect, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';

import {
  LayoutDashboard,
  Store,
  Package,
  Settings,
  ChevronDown,
  ChevronRight,
  LogOut,
  UserRound,
  MoreHorizontal,
  BarChart3,
  X,
} from 'lucide-react';

import ThemeSwitcher from '@/components/theme-switcher';

const primaryLinks = [
  { label: 'overview', href: '/', icon: LayoutDashboard },
  {
    label: 'shops',
    href: '/shops',
    icon: Store,
    children: [
      { label: 'shopList', href: '/shops' },
      { label: 'shopCategories', href: '/shops/categories' },
    ],
  },
  {
    label: 'products',
    href: '/products',
    icon: Package,
    children: [
      { label: 'productList', href: '/products' },
      { label: 'productBrands', href: '/products/brands' },
      { label: 'productCategories', href: '/products/categories' },
    ],
  },
];

const extraLinks = [
  { label: 'reports', href: '/admin/reports', icon: BarChart3 },
  { label: 'settings', href: '/admin/settings', icon: Settings },
];

export default function AdminShell({ children }) {
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [openNav, setOpenNav] = useState(null);

  const t = useTranslations('adminLayout');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const userMenuRef = useRef(null);

  function isActive(href) {
    return href === '/'
      ? pathname === '/'
      : pathname === href || pathname.startsWith(`${href}/`);
  }

  function changeLanguage() {
    setUserMenuOpen(false);
    setMobileMoreOpen(false);

    router.replace(pathname, {
      locale: locale === 'sw' ? 'en' : 'sw',
    });
  }

  async function logout() {
    try {
      await fetch('/api/v1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'logout', payload: {} }),
      });
    } finally {
      window.location.replace(
        `${process.env.APP_ROOT_URL}/${locale}/login`
      );
    }
  }

  useEffect(() => {
    function handleOutsideClick(event) {
      if (!userMenuRef.current?.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === 'Escape') {
        setUserMenuOpen(false);
        setMobileMoreOpen(false);
      }
    }

    document.addEventListener('pointerdown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('pointerdown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  function NavLink({ item, mobile = false }) {
    const Icon = item.icon;
    const hasChildren = Boolean(item.children?.length);
    const active = hasChildren
      ? item.children.some((child) => isActive(child.href))
      : isActive(item.href);
    const expanded = openNav === item.label;

    const parentClass = mobile
      ? `flex min-w-0 flex-col items-center gap-1 rounded-xl px-2 py-2 text-[11px] font-medium ${
          active
            ? 'text-violet-600 dark:text-violet-300'
            : 'text-slate-500 dark:text-slate-400'
        }`
      : `flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] font-medium transition-all duration-200 ${
          active
            ? 'bg-violet-50 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300'
            : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
        }`;

    if (mobile || !hasChildren) {
      return (
        <Link
          href={item.href}
          onClick={() => {
            setMobileMoreOpen(false);
            if (mobile) setUserMenuOpen(false);
          }}
          className={parentClass}
        >
          <Icon size={mobile ? 20 : 18} strokeWidth={active ? 2.3 : 1.8} />
          <span className="truncate">{t(item.label)}</span>
        </Link>
      );
    }

    return (
      <div className="space-y-1">
        <button
          type="button"
          onClick={() =>
            setOpenNav((current) => (current === item.label ? null : item.label))
          }
          aria-expanded={expanded}
          className={parentClass}
        >
          <Icon size={18} strokeWidth={active ? 2.3 : 1.8} />
          <span className="min-w-0 flex-1 truncate">{t(item.label)}</span>
          <ChevronDown
            size={15}
            className={`shrink-0 text-slate-400 transition-transform duration-200 ${
              expanded ? 'rotate-180 text-violet-600 dark:text-violet-300' : ''
            }`}
          />
        </button>

        <div
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            expanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <div
              className={`relative ml-[21px] space-y-0.5 border-l border-slate-200 py-1 pl-3 transition-transform duration-300 ease-out dark:border-slate-700 ${
                expanded ? 'translate-y-0' : '-translate-y-1'
              }`}
            >
              {item.children.map((child) => {
                const childActive =
                  child.href === '/shops' || child.href === '/products'
                    ? pathname === child.href
                    : isActive(child.href);

                return (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={() => setMobileMoreOpen(false)}
                    className={`group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[12px] transition-colors duration-200 ${
                      childActive
                        ? 'font-semibold text-violet-700 dark:text-violet-300'
                        : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100'
                    }`} 
                  >
                    <span
                      className={`size-1.5 shrink-0 rounded-full transition-colors ${
                        childActive
                          ? 'bg-violet-600 ring-4 ring-violet-100 dark:bg-violet-300 dark:ring-violet-500/10'
                          : 'bg-slate-300 group-hover:bg-violet-400 dark:bg-slate-600'
                      }`}
                    />
                    <span className="truncate">{t(child.label)}</span>
                    {childActive && (
                      <span className="ml-auto size-1.5 rounded-full bg-violet-500" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-[#f6f7fb] text-slate-900 dark:bg-[#0b0d14] dark:text-slate-100">

      {/* Focus overlay: blur dashboard while user popup is open */}
      {userMenuOpen && (
        <button
          type="button"
          aria-label={t('closeUserMenu')}
          onClick={() => setUserMenuOpen(false)}
          className="fixed inset-0 z-[25] bg-slate-950/15 backdrop-blur-[3px] animate-[overlayIn_180ms_ease-out] dark:bg-black/25"
        />
      )}

      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[248px] flex-col border-r border-slate-200/80 bg-white dark:border-slate-800 dark:bg-[#10131c] lg:flex">

        {/* Brand */}
        <div className="flex h-[68px] items-center gap-3 px-5">
          <div className="grid size-9 place-items-center rounded-xl bg-violet-600 text-sm font-bold text-white shadow-lg shadow-violet-600/20">
            D
          </div>

          <div className="leading-tight">
            <p className="text-sm font-bold tracking-tight">
              Duka Admin
            </p>

            <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400">
              {t('controlCenter')}
            </p>
          </div>
        </div>

        <div className="mx-4 mb-3 h-px bg-slate-100 dark:bg-slate-800" />

        {/* Navigation */}
        <nav className="scrollbar-none flex-1 space-y-1 overflow-y-auto px-3">

          <p className="px-3 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">
            {t('workspace')}
          </p>

          {primaryLinks.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}

          <p className="px-3 pb-2 pt-5 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">
            {t('manage')}
          </p>

          {extraLinks.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
        </nav>

        {/* Premium User Section */}
        <div
          ref={userMenuRef}
          className="relative border-t border-slate-100 p-2.5 dark:border-slate-800"
        >

          {/* Compact User Popup */}
          {userMenuOpen && (
            <div className="absolute bottom-[calc(100%+9px)] left-2.5 right-2.5 z-[35] origin-bottom-left animate-[userMenuIn_180ms_ease-out]">

              <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-[0_16px_45px_-12px_rgba(15,23,42,0.3)] dark:border-slate-700 dark:bg-[#171b29]">

                {/* Popup Header */}
                <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-violet-700 to-indigo-800 px-3 py-3">

                  <div className="absolute -right-8 -top-10 size-28 rounded-full border-[16px] border-white/5" />

                  <div className="relative flex items-center gap-2.5">

                    <div className="relative shrink-0">
                      <div className="grid size-10 place-items-center rounded-xl border border-white/20 bg-white/15 text-base font-bold text-white shadow-md backdrop-blur-md">
                        A
                      </div>

                      <span className="absolute -bottom-1 -right-1 size-3 rounded-full border-2 border-violet-700 bg-emerald-400" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-violet-200">
                        {t('signedIn')}
                      </p>

                      <p className="mt-0.5 truncate text-[13px] font-bold text-white">
                        {t('administrator')}
                      </p>

                      <div className="mt-1 flex items-center gap-1">
                        <span className="size-1.5 rounded-full bg-emerald-400" />

                        <span className="text-[9px] font-medium text-violet-100">
                          {t('online')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Popup Body */}
                <div className="p-2">

                  {/* Account Information */}
                  <div className="mb-1.5 flex items-center gap-2 rounded-lg bg-slate-50 px-2.5 py-2 dark:bg-slate-800/60">

                    <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
                      <UserRound size={14} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold text-slate-800 dark:text-slate-100">
                        {t('adminRole')}
                      </p>

                      <p className="mt-0.5 text-[9px] text-slate-500 dark:text-slate-400">
                        {t('systemAdmin')}
                      </p>
                    </div>
                  </div>

                  {/* Profile */}
                  <Link
                    href="/admin/profile"
                    onClick={() => setUserMenuOpen(false)}
                    className="group flex items-center gap-2.5 rounded-lg px-2.5 py-2 transition-colors hover:bg-violet-50 dark:hover:bg-violet-500/10"
                  >
                    <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-slate-100 text-slate-600 transition-colors group-hover:bg-violet-100 group-hover:text-violet-700 dark:bg-slate-800 dark:text-slate-300 dark:group-hover:bg-violet-500/15 dark:group-hover:text-violet-300">
                      <UserRound size={15} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold text-slate-800 dark:text-slate-100">
                        {t('profile')}
                      </p>

                      <p className="mt-0.5 text-[9px] text-slate-500 dark:text-slate-400">
                        {t('manageProfile')}
                      </p>
                    </div>

                    <ChevronRight
                      size={14}
                      className="text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-violet-600"
                    />
                  </Link>

                  <div className="my-1.5 h-px bg-slate-100 dark:bg-slate-800" />

                  {/* Logout */}
                  <button
                    onClick={logout}
                    className="group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-rose-50 dark:hover:bg-rose-500/10"
                  >
                    <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400">
                      <LogOut size={15} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold text-rose-600 dark:text-rose-400">
                        {t('logout')}
                      </p>

                      <p className="mt-0.5 text-[9px] text-slate-500 dark:text-slate-400">
                        {t('signOut')}
                      </p>
                    </div>
                  </button>

                </div>
              </div>
            </div>
          )}

          {/* Compact User Card */}
          <button
            onClick={() => setUserMenuOpen((value) => !value)}
            aria-expanded={userMenuOpen}
            className={`group relative flex w-full items-center gap-2.5 rounded-xl border p-2 text-left transition-all duration-200 ${
              userMenuOpen
                ? 'border-violet-200 bg-violet-50 dark:border-violet-500/30 dark:bg-violet-500/10'
                : 'border-transparent bg-slate-50/80 hover:border-slate-200 hover:bg-white hover:shadow-sm dark:bg-slate-800/50 dark:hover:border-slate-700 dark:hover:bg-slate-800'
            }`}
          >

            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-700 text-xs font-bold text-white shadow-md shadow-violet-600/20 transition-transform duration-200 group-hover:scale-105">
                A
              </div>

              <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-white bg-emerald-500 dark:border-[#10131c]" />
            </div>

            {/* User Details */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-bold text-slate-800 dark:text-slate-100">
                {t('administrator')}
              </p>

              <p className="mt-0.5 truncate text-[10px] text-slate-500 dark:text-slate-400">
                {t('systemAdmin')}
              </p>
            </div>

            {/* Dropdown */}
            <div
              className={`grid size-6 shrink-0 place-items-center rounded-lg transition-all duration-200 ${
                userMenuOpen
                  ? 'rotate-180 bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300'
                  : 'text-slate-400 group-hover:bg-slate-200/70 dark:group-hover:bg-slate-700'
              }`}
            >
              <ChevronDown size={14} />
            </div>
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="lg:pl-[248px]">

        <header className="sticky top-0 z-20 flex h-[62px] items-center gap-3 border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur-xl sm:px-6 dark:border-slate-800 dark:bg-[#10131c]/90">

          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              {t('platform')}
            </p>

            <p className="truncate text-sm font-semibold">
              {t('adminWorkspace')}
            </p>
          </div>

          <button
            onClick={changeLanguage}
            className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-[11px] font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {locale.toUpperCase()}
          </button>

          <ThemeSwitcher />
        </header>

        <main className="mx-auto max-w-[1440px] px-4 pb-24 pt-5 sm:px-6 sm:pt-6 lg:px-7 lg:pb-8">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200/90 bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] pt-1.5 backdrop-blur-xl lg:hidden dark:border-slate-800 dark:bg-[#10131c]/95">

        <div className="mx-auto grid max-w-lg grid-cols-5 items-end">

          {primaryLinks.slice(0, 4).map((item) => (
            <NavLink key={item.href} item={item} mobile />
          ))}

          <button
            onClick={() => setMobileMoreOpen((open) => !open)}
            className="relative -mt-5 flex min-w-0 flex-col items-center gap-1.5 text-[10px] font-semibold"
          >
            <span className="grid size-12 place-items-center rounded-full border-[4px] border-[#f6f7fb] bg-violet-600 text-white shadow-lg shadow-violet-600/30 transition-transform active:scale-95 dark:border-[#0b0d14]">
              {mobileMoreOpen
                ? <X size={19} />
                : <MoreHorizontal size={21} />
              }
            </span>

            <span
              className={
                mobileMoreOpen
                  ? 'text-violet-600 dark:text-violet-300'
                  : 'text-slate-500 dark:text-slate-400'
              }
            >
              {t('more')}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile More Menu */}
      {mobileMoreOpen && (
        <>
          <button
            aria-label={t('closeMoreMenu')}
            onClick={() => setMobileMoreOpen(false)}
            className="fixed inset-0 z-40 bg-slate-950/30 lg:hidden"
          />

          <div className="fixed inset-x-3 bottom-[calc(68px+env(safe-area-inset-bottom))] z-50 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-900/15 lg:hidden dark:border-slate-700 dark:bg-slate-900">

            <div className="grid grid-cols-3 gap-1">

              {extraLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMoreOpen(false)}
                    className={`flex flex-col items-center gap-2 rounded-xl px-2 py-3 text-xs font-medium ${
                      isActive(item.href)
                        ? 'bg-violet-50 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300'
                        : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon size={19} />
                    {t(item.label)}
                  </Link>
                );
              })}

              <Link
                href="/admin/profile"
                onClick={() => setMobileMoreOpen(false)}
                className="flex flex-col items-center gap-2 rounded-xl px-2 py-3 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <UserRound size={19} />
                {t('account')}
              </Link>

              <button
                onClick={logout}
                className="flex flex-col items-center gap-2 rounded-xl px-2 py-3 text-xs font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10"
              >
                <LogOut size={19} />
                {t('logout')}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
