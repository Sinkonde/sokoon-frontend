
'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

import useApiMutation from '@/lib/query/useApiMutation';
import LanguageSwitcher from '@/components/langswitcher';
import ThemeSwitcher from '@/components/theme-switcher';
import Image from 'next/image';

function BrandIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" className="size-5">
      <path d="M3 9h18l-1.5 11h-15L3 9Z" />
      <path d="M7 9V6a5 5 0 0 1 10 0v3" />
    </svg>
  );
}

function StoreIllustration() {
  return (
    <Image
      src="/img/store-illustration.svg"
      alt="Duka SaaS retail management illustration"
      width={440}
      height={250}
      priority
      className="mx-auto h-auto w-full max-w-[310px] object-contain"
    />
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.7" className="size-[17px]">
      <circle cx="12" cy="8" r="4" />
      <path d="M5 21a7 7 0 0 1 14 0" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.7" className="size-[17px]">
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 1 1 8 0v3" />
    </svg>
  );
}

function EyeIcon({ visible }) {
  return visible ? (
    <svg viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.7" className="size-5">
      <path d="M3 3l18 18" />
      <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
      <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c5.5 0 9 7 9 7a15 15 0 0 1-3.1 3.7" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.7" className="size-5">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function LoadingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none"
      className="size-4 animate-spin">
      <circle cx="12" cy="12" r="9"
        stroke="currentColor" strokeWidth="3" className="opacity-25" />
      <path d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export default function LoginPage() {
  const t = useTranslations('auth');
  const router = useRouter();

  const locale = useLocale();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = useApiMutation('login', {
    onSuccess: (result) => {
      if (result?.data?.user?.role === 'super_admin') {

        const adminUrl = new URL(
          `/${locale}`,
          process.env.NEXT_PUBLIC_ADMIN_URL
        );
    
        adminUrl.searchParams.set('token', encodeURIComponent(result?.data?.token));
    
        window.location.assign(adminUrl.toString());

        //alert("maandazi")
    
        return;
      }
    },

    onError: (error) => {
      // Diagnostic information without exposing credentials or token
      console.error('LOGIN REQUEST FAILED:', {
        status: error.status,
        code: error.code,
        message: error.message,
        backendMessage: error.data?.message,
      })}
  });

  function handleSubmit(event) {
    event.preventDefault();

    if (loginMutation.isPending) return;

    loginMutation.mutate({
      login_id: identifier.trim(),
      password,
    });
  }

  function clearError() {
    if (loginMutation.isError) {
      loginMutation.reset();
    }
  }

  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-x-hidden bg-[#f0f1ff] px-4 py-6 text-slate-900 dark:bg-[#0d1020] dark:text-white sm:px-6 lg:h-dvh lg:min-h-0 lg:overflow-hidden">

      <div className="pointer-events-none absolute -left-40 -top-40 size-[400px] rounded-full bg-indigo-400/15 blur-[110px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 size-[400px] rounded-full bg-violet-400/15 blur-[110px]" />

      <div className="relative z-10 w-full max-w-[790px]">

        {/* Floating desktop card / Mobile transparent layout */}

        <div className="grid w-full lg:h-[min(520px,calc(100dvh-100px))] lg:grid-cols-2 lg:overflow-hidden lg:rounded-[20px] lg:border lg:border-white/80 lg:bg-white lg:shadow-[0_24px_70px_-22px_rgba(50,50,100,0.20)] dark:lg:border-white/10 dark:lg:bg-[#151a2b]">

          {/* LEFT SIDE - DESKTOP ONLY */}

          <section className="relative hidden min-w-0 flex-col justify-between overflow-hidden bg-[#f7f7ff] p-6 dark:bg-[#191d35] lg:flex">

            <div className="pointer-events-none absolute -right-20 top-14 size-48 rounded-full border border-indigo-200/60 dark:border-indigo-400/10" />
            <div className="pointer-events-none absolute -right-10 top-24 size-32 rounded-full border border-indigo-200/60 dark:border-indigo-400/10" />

            <div className="relative z-10 flex items-center gap-2.5">

              <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/20">
                <BrandIcon />
              </div>

              <div>
                <h1 className="text-sm font-bold">
                  {t('brand')}
                </h1>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  {t('brandDescription')}
                </p>
              </div>

            </div>

            <div className="relative z-10">

              <span className="text-[9px] font-bold tracking-[0.18em] text-indigo-600 dark:text-indigo-400">
                {t('heroEyebrow')}
              </span>

              <h2 className="mt-2 max-w-[300px] text-[25px] font-bold leading-tight tracking-tight">
                {t('heroTitle')}
              </h2>

              <p className="mt-2 max-w-[290px] text-xs leading-5 text-slate-600 dark:text-slate-300">
                {t('heroDescription')}
              </p>

            </div>

            <div className="relative z-10 -my-1">
              <StoreIllustration />
            </div>

            <div className="relative z-10 grid grid-cols-3 gap-2 border-t border-indigo-200/60 pt-3 dark:border-white/10">

              <div className="flex items-center gap-1.5 text-[9px] leading-3 text-slate-600 dark:text-slate-300">
                <span className="text-indigo-600 dark:text-indigo-400">⚡</span>
                {t('featureSales')}
              </div>

              <div className="flex items-center gap-1.5 text-[9px] leading-3 text-slate-600 dark:text-slate-300">
                <span className="text-indigo-600 dark:text-indigo-400">✓</span>
                {t('featureInventory')}
              </div>

              <div className="flex items-center gap-1.5 text-[9px] leading-3 text-slate-600 dark:text-slate-300">
                <span className="text-indigo-600 dark:text-indigo-400">▥</span>
                {t('featureReports')}
              </div>

            </div>

          </section>

          {/* RIGHT SIDE - LOGIN */}

          <section className="flex min-w-0 flex-col bg-transparent px-1 py-2 dark:bg-transparent lg:bg-white lg:p-6 dark:lg:bg-[#151a2b]">

            {/* Header */}

            <header className="flex shrink-0 items-center justify-between gap-3">

              {/* Mobile: logo and name only */}

              <div className="flex items-center gap-2.5 lg:hidden">

                <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-500/20">
                  <BrandIcon />
                </div>

                <span className="text-sm font-bold tracking-tight">
                  {t('brand')}
                </span>

              </div>

              {/* Language and theme */}

              <div className="ml-auto flex shrink-0 items-center gap-1.5">
                <LanguageSwitcher />
                <ThemeSwitcher />
              </div>

            </header>

            {/* Form */}

            <div className="mx-auto flex w-full max-w-[310px] flex-1 flex-col justify-center py-8 lg:py-0">

              <div className="mb-6 text-center">

                <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                  <UserIcon />
                </div>

                <h2 className="text-xl font-bold tracking-tight">
                  {t('welcomeTitle')}
                </h2>

                <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                  {t('welcomeSubtitle')}
                </p>

              </div>

              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Username */}

                <div>

                  <label htmlFor="identifier"
                    className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-200">
                    {t('identifierLabel')}
                  </label>

                  <div className="relative">

                    <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
                      <UserIcon />
                    </span>

                    <input
                      id="identifier"
                      name="name"
                      type="text"
                      autoComplete="username"
                      autoCapitalize="none"
                      spellCheck={false}
                      required
                      value={identifier}
                      onChange={(event) => {
                        setIdentifier(event.target.value);
                        clearError();
                      }}
                      placeholder={t('identifierPlaceholder')}
                      className="h-11 w-full rounded-lg border border-slate-200 bg-white/80 pl-10 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-white/[0.05] dark:text-white dark:focus:border-indigo-400"
                    />

                  </div>

                </div>

                {/* Password */}

                <div>

                  <label htmlFor="password"
                    className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-200">
                    {t('passwordLabel')}
                  </label>

                  <div className="relative">

                    <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
                      <LockIcon />
                    </span>

                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                        clearError();
                      }}
                      placeholder={t('passwordPlaceholder')}
                      className="h-11 w-full rounded-lg border border-slate-200 bg-white/80 pl-10 pr-10 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-white/[0.05] dark:text-white dark:focus:border-indigo-400"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(value => !value)}
                      aria-label={showPassword ? t('hidePassword') : t('showPassword')}
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 transition hover:text-indigo-600 dark:hover:text-indigo-400"
                    >
                      <EyeIcon visible={showPassword} />
                    </button>

                  </div>

                </div>

                {/* Login button */}

                <button
                  type="submit"
                  disabled={loginMutation.isPending}
                  className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 text-sm font-bold text-white shadow-md shadow-indigo-500/20 transition hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
                >

                  {loginMutation.isPending ? (
                    <>
                      <LoadingIcon />
                      {t('signingIn')}
                    </>
                  ) : (
                    <>
                      {t('signIn')}
                      <svg viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" className="size-4">
                        <path d="M5 12h14m-6-6 6 6-6 6" />
                      </svg>
                    </>
                  )}

                </button>

              </form>

            </div>

          </section>

        </div>

        {/* Security note */}

        <div className="mt-4 flex items-center justify-center gap-2 text-center text-[11px] text-slate-500 dark:text-slate-400">
          <svg viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.8" className="size-4 shrink-0 text-indigo-600 dark:text-indigo-400">
            <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
          {t('secureNote')}
        </div>

      </div>

    </main>
  );
}
