'use client';

import { useState } from 'react';
import { useEffect, useRef } from 'react';
import { useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import {
  LayoutDashboard,
  Store,
  Package,
  ShoppingCart,
  Users,
  Wallet,
  Settings,
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  LogOut,
  UserRound,
  MoreHorizontal,
  BarChart3,
} from 'lucide-react';
import ThemeSwitcher from '@/components/theme-switcher';

const primaryLinks = [
  { label: 'Overview', href: '/', icon: LayoutDashboard },
  { label: 'Shops', href: '/shops', icon: Store },
  { label: 'Products', href: '/products', icon: Package },
//   { label: 'Sales', href: '/sales', icon: ShoppingCart },
//   { label: 'Customers', href: '/customers', icon: Users },
];

const extraLinks = [
//   { label: 'Expenses', href: '/admin/expenses', icon: Wallet },
  { label: 'Reports', href: '/admin/reports', icon: BarChart3 },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminShell({ children }) {
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();


  function isActive(href) {
    return href === '/admin'
      ? pathname === '/admin'
      : pathname === href || pathname.startsWith(`${href}/`);
  }

  function changeLanguage() {
    setUserMenuOpen(false);
    setMobileMoreOpen(false);
    router.replace(pathname, { locale: locale === 'sw' ? 'en' : 'sw' });
  }

  async function logout() {
    try {
      await fetch('/api/v1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'logout', payload: {} }),
      });
    } finally {
      window.location.replace(`${process.env.APP_ROOT_URL}/${locale}/login`);
    }
  }

  const userMenuRef = useRef(null);

useEffect(() => {
  function handleOutsideClick(event) {
    if (!userMenuRef.current?.contains(event.target)) {
      setUserMenuOpen(false);
    }
  }

  function handleEscape(event) {
    if (event.key === 'Escape') setUserMenuOpen(false);
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
    const active = isActive(item.href);

    return (
      <Link
        href={item.href}
        onClick={() => {
          setMobileMoreOpen(false);
          if (mobile) setUserMenuOpen(false);
        }}
        className={
          mobile
            ? `flex min-w-0 flex-col items-center gap-1 rounded-xl px-2 py-2 text-[11px] font-medium ${
                active
                  ? 'text-violet-600 dark:text-violet-300'
                  : 'text-slate-500 dark:text-slate-400'
              }`
            : `flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-colors ${
                active
                  ? 'bg-violet-50 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
              }`
        }
      >
        <Icon size={mobile ? 20 : 18} strokeWidth={active ? 2.3 : 1.8} />
        <span className="truncate">{item.label}</span>
      </Link>
    );
  }

  return (
    <div className="min-h-dvh bg-[#f6f7fb] text-slate-900 dark:bg-[#0b0d14] dark:text-slate-100">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[248px] flex-col border-r border-slate-200/80 bg-white dark:border-slate-800 dark:bg-[#10131c] lg:flex">
        <div className="flex h-[68px] items-center gap-3 px-5">
          <div className="grid size-9 place-items-center rounded-xl bg-violet-600 text-sm font-bold text-white shadow-lg shadow-violet-600/20">
            D
          </div>
          <div className="leading-tight">
            <p className="text-sm font-bold tracking-tight">Duka Admin</p>
            <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400">
              Control center
            </p>
          </div>
        </div>

        <div className="mx-4 mb-3 h-px bg-slate-100 dark:bg-slate-800" />

        <nav className="scrollbar-none flex-1 space-y-1 overflow-y-auto px-3">
          <p className="px-3 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">
            Workspace
          </p>
          {primaryLinks.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}

          <p className="px-3 pb-2 pt-5 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">
            Manage
          </p>
          {extraLinks.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
        </nav>

        <div ref={userMenuRef} className="relative border-t border-slate-100 p-3 dark:border-slate-800">
          {userMenuOpen && (
            <div className="absolute bottom-[calc(100%+8px)] left-3 right-3 z-50 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 p-1.5 shadow-[0_18px_50px_-15px_rgba(15,23,42,0.25)] backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/95">
              <Link
                href="/admin/profile"
                onClick={() => setUserMenuOpen(false)}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <UserRound size={16} />
                Profile
              </Link>
              <button
                onClick={logout}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}

          <button
            onClick={() => setUserMenuOpen((value) => !value)}
            className="flex w-full items-center gap-3 rounded-xl p-2.5 text-left transition hover:bg-slate-50 dark:hover:bg-slate-800/70"
          >
            <div className="grid size-9 shrink-0 place-items-center rounded-full bg-violet-100 text-xs font-bold text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
              A
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold">Administrator</p>
              <p className="mt-0.5 truncate text-[11px] text-slate-500">System admin</p>
            </div>
            <ChevronDown size={15} className="text-slate-400" />
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="lg:pl-[248px]">
        <header className="sticky top-0 z-20 flex h-[62px] items-center gap-3 border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur-xl sm:px-6 dark:border-slate-800 dark:bg-[#10131c]/90">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Duka platform
            </p>
            <p className="truncate text-sm font-semibold">Admin workspace</p>
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

      {/* Mobile bottom navigation */}
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
            {mobileMoreOpen ? <X size={19} /> : <MoreHorizontal size={21} />}
        </span>
        <span className={mobileMoreOpen
            ? 'text-violet-600 dark:text-violet-300'
            : 'text-slate-500 dark:text-slate-400'
        }>
            More
        </span>
</button>
        </div>
      </nav>

      {mobileMoreOpen && (
        <>
          <button
            aria-label="Close more menu"
            onClick={() => setMobileMoreOpen(false)}
            className="fixed inset-0 z-40 bg-slate-950/30 lg:hidden"
          />
          <div className="fixed inset-x-3 bottom-[calc(68px+env(safe-area-inset-bottom))] z-50 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-900/15 lg:hidden dark:border-slate-700 dark:bg-slate-900">
            <div className="grid grid-cols-3 gap-1">
              {[primaryLinks[4], ...extraLinks].map((item) => {
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
                    {item.label}
                  </Link>
                );
              })}
              <button
                onClick={() => {
                  setUserMenuOpen((open) => !open);
                  setMobileMoreOpen(false);
                }}
                className="flex flex-col items-center gap-2 rounded-xl px-2 py-3 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <UserRound size={19} />
                Account
              </button>
              <button
                onClick={logout}
                className="flex flex-col items-center gap-2 rounded-xl px-2 py-3 text-xs font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10"
              >
                <LogOut size={19} />
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}