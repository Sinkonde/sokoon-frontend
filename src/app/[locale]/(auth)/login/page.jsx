
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { useRouter } from '@/i18n/navigation';
import ThemeSwitcher from '@/components/theme-switcher';
import LanguageSwitcher from '@/components/langswitcher';
import useApiMutation from '@/lib/query/useApiMutation';

function BrandIcon({ className = 'size-6' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
    >
      <path d="M3 9h18l-1.5 11h-15L3 9Z" />
      <path d="M7 9V6a5 5 0 0 1 10 0v3" />
      <path d="M9 13v.01M15 13v.01" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="size-4"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="size-5"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M5 21a7 7 0 0 1 14 0" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="size-5"
    >
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 1 1 8 0v3" />
    </svg>
  );
}

function EyeIcon({ visible }) {
  return visible ? (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="size-5"
    >
      <path d="M3 3l18 18" />
      <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
      <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c5.5 0 9 7 9 7a15 15 0 0 1-3.1 3.7" />
      <path d="M6.2 6.2C4.1 7.5 3 12 3 12s3.5 7 9 7a10 10 0 0 0 2.8-.4" />
    </svg>
  ) : (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="size-5"
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function LoadingIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="size-5 animate-spin"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="3"
        className="opacity-25"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function LoginPage() {
  const t = useTranslations('auth');
  const router = useRouter();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = useApiMutation('login', {
    meta: {
      showGlobalError: false,
    },

    onSuccess: (result) => {
      const redirectUrl =
        result?.data?.redirect_url ||
        result?.redirect_url;

      if (
        typeof redirectUrl === 'string' &&
        redirectUrl.trim()
      ) {
        window.location.assign(redirectUrl);
        return;
      }

      router.replace('/');
    },
  });

  const validationErrors =
    loginMutation.error?.errors || {};

  const identifierError =
    validationErrors.name?.[0] ||
    validationErrors.email?.[0];

  const passwordError =
    validationErrors.password?.[0];

  const hasFieldErrors =
    Boolean(identifierError || passwordError);

  const hasGeneralError =
    loginMutation.isError && !hasFieldErrors;

  function clearError() {
    if (loginMutation.isError) {
      loginMutation.reset();
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (loginMutation.isPending) return;

    loginMutation.mutate({
      loginId: identifier.trim(),
      password,
    });
  }

  const features = [
    'featureSales',
    'featureInventory',
    'featureReports',
  ];

  return (
    <main className="flex min-h-dvh bg-slate-50 text-slate-900 transition-colors dark:bg-[#080d19] dark:text-white lg:h-dvh lg:min-h-0 lg:overflow-hidden">

      <div className="mx-auto grid min-h-dvh w-full max-w-[1600px] lg:h-full lg:min-h-0 lg:grid-cols-2">

        {/* BRAND PANEL - DESKTOP */}

        <aside className="relative hidden overflow-hidden bg-[#111a35] px-10 text-white lg:flex lg:min-h-0 lg:flex-col lg:py-[clamp(16px,3vh,36px)] xl:px-14 2xl:px-20">

          {/* Decorative backgrounds */}

          <div className="pointer-events-none absolute -right-40 -top-40 size-[450px] rounded-full bg-indigo-500/20 blur-[100px]" />

          <div className="pointer-events-none absolute -bottom-48 -left-40 size-[450px] rounded-full bg-violet-500/20 blur-[110px]" />

          <div className="pointer-events-none absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:42px_42px]" />

          {/* Brand */}

          <div className="relative z-10 flex shrink-0 items-center gap-3">

            <div className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-400 to-violet-600 shadow-lg shadow-indigo-950/30">

              <BrandIcon />

            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight">
                {t('brand')}
              </h1>

              <p className="text-xs text-slate-400">
                {t('brandDescription')}
              </p>
            </div>

          </div>

          {/* Hero */}

          <div className="relative z-10 my-auto w-full max-w-xl py-5">

            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-300/20 bg-indigo-300/10 px-3 py-1.5 text-[10px] font-bold tracking-[0.18em] text-indigo-200">

              <span className="size-1.5 rounded-full bg-indigo-300" />

              {t('heroEyebrow')}

            </span>

            <h2 className="mt-5 text-[clamp(30px,3.3vw,48px)] font-bold leading-[1.12] tracking-tight xl:mt-6">

              {t('heroTitle')}

            </h2>

            <p className="mt-4 max-w-lg text-sm leading-7 text-slate-300 xl:mt-5 xl:text-base">

              {t('heroDescription')}

            </p>

            <div className="mt-6 space-y-3 xl:mt-8 xl:space-y-4">

              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3"
                >

                  <span className="flex size-8 shrink-0 items-center justify-center rounded-xl border border-emerald-300/20 bg-emerald-300/10 text-emerald-300">

                    <CheckIcon />

                  </span>

                  <span className="text-sm font-medium text-slate-200">
                    {t(feature)}
                  </span>

                </div>
              ))}

            </div>

          </div>

          {/* Brand footer */}

          <div className="relative z-10 flex shrink-0 items-center justify-between border-t border-white/10 pt-4 text-[11px] text-slate-400">

            <span>{t('brand')}</span>

            <span>{t('platformDescription')}</span>

          </div>

        </aside>

        {/* LOGIN PANEL */}

        <section className="relative flex min-h-dvh flex-col px-5 py-5 sm:px-8 sm:py-7 lg:h-full lg:min-h-0 lg:px-10 lg:py-[clamp(12px,2vh,24px)] xl:px-14 2xl:px-20">

          {/* Top header */}

          <header className="flex shrink-0 items-center justify-between gap-3">

            {/* Mobile brand */}

            <div className="flex min-w-0 items-center gap-2.5 lg:hidden">

              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-500/20">

                <BrandIcon className="size-5" />

              </div>

              <span className="truncate text-base font-bold tracking-tight">
                {t('brand')}
              </span>

            </div>

            <div className="ml-auto flex shrink-0 items-center gap-2">

              <LanguageSwitcher />

              <ThemeSwitcher />

            </div>

          </header>

          {/* Form area */}

          <div className="flex flex-1 items-center justify-center py-9 sm:py-12 lg:min-h-0 lg:py-4">

            <div className="w-full max-w-[410px]">

              {/* Heading */}

              <div className="mb-7 sm:mb-9 lg:mb-6">

                <span className="text-[10px] font-bold tracking-[0.2em] text-indigo-600 dark:text-indigo-400 sm:text-xs">

                  {t('signInLabel')}

                </span>

                <h2 className="mt-2.5 text-[30px] font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-[32px]">

                  {t('welcomeTitle')}

                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">

                  {t('welcomeSubtitle')}

                </p>

              </div>

              {/* General error */}

              {hasGeneralError && (
                <div
                  role="alert"
                  className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-3.5 text-sm text-red-700 dark:border-red-400/20 dark:bg-red-500/10 dark:text-red-300"
                >

                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="mt-0.5 size-5 shrink-0"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 8v4m0 4h.01" />
                  </svg>

                  <span>{t('loginFailed')}</span>

                </div>
              )}

              {/* Login form */}

              <form
                onSubmit={handleSubmit}
                className="space-y-4 lg:space-y-3.5"
              >

                {/* Identifier */}

                <div className="space-y-1.5">

                  <label
                    htmlFor="identifier"
                    className="block text-sm font-semibold text-slate-700 dark:text-slate-200"
                  >
                    {t('identifierLabel')}
                  </label>

                  <div className="relative">

                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">

                      <UserIcon />

                    </div>

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
                      aria-invalid={Boolean(identifierError)}
                      aria-describedby={
                        identifierError
                          ? 'identifier-error'
                          : undefined
                      }
                      className={`h-[50px] w-full rounded-xl border bg-white pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-500 ${
                        identifierError
                          ? 'border-red-400 focus:border-red-400 focus:ring-red-500/10'
                          : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/10 dark:border-white/10 dark:focus:border-indigo-400'
                      }`}
                    />

                  </div>

                  {identifierError && (
                    <p
                      id="identifier-error"
                      className="text-xs font-medium text-red-600 dark:text-red-400"
                    >
                      {identifierError}
                    </p>
                  )}

                </div>

                {/* Password */}

                <div className="space-y-1.5">

                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-slate-700 dark:text-slate-200"
                  >
                    {t('passwordLabel')}
                  </label>

                  <div className="relative">

                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">

                      <LockIcon />

                    </div>

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
                      aria-invalid={Boolean(passwordError)}
                      aria-describedby={
                        passwordError
                          ? 'password-error'
                          : undefined
                      }
                      className={`h-[50px] w-full rounded-xl border bg-white pl-12 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-500 ${
                        passwordError
                          ? 'border-red-400 focus:border-red-400 focus:ring-red-500/10'
                          : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/10 dark:border-white/10 dark:focus:border-indigo-400'
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      aria-label={
                        showPassword
                          ? t('hidePassword')
                          : t('showPassword')
                      }
                      aria-pressed={showPassword}
                      className="absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 transition hover:text-slate-700 dark:hover:text-white"
                    >

                      <EyeIcon visible={showPassword} />

                    </button>

                  </div>

                  {passwordError && (
                    <p
                      id="password-error"
                      className="text-xs font-medium text-red-600 dark:text-red-400"
                    >
                      {passwordError}
                    </p>
                  )}

                </div>

                {/* Submit button */}

                <button
                  type="submit"
                  disabled={loginMutation.isPending}
                  className="group mt-2 flex h-[50px] w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:from-indigo-500 hover:to-violet-500 hover:shadow-xl hover:shadow-indigo-500/25 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                >

                  {loginMutation.isPending ? (
                    <>
                      <LoadingIcon />
                      {t('signingIn')}
                    </>
                  ) : (
                    <>
                      {t('signIn')}

                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="size-4 transition group-hover:translate-x-1"
                      >
                        <path d="M5 12h14m-6-6 6 6-6 6" />
                      </svg>
                    </>
                  )}

                </button>

              </form>

              {/* Security note */}

              <div className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-slate-500 dark:text-slate-400 lg:mt-5">

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className="size-4 shrink-0"
                >
                  <rect x="4" y="10" width="16" height="11" rx="2" />
                  <path d="M8 10V7a4 4 0 1 1 8 0v3" />
                </svg>

                {t('secureNote')}

              </div>

            </div>

          </div>

          {/* Footer */}

          <footer className="shrink-0 pt-2 text-center text-[11px] text-slate-400 dark:text-slate-500">

            © Duka SaaS. {t('footerRights')}

          </footer>

        </section>

      </div>

    </main>
  );
}
