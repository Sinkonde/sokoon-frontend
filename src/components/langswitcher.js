'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '../i18n/navigation';
import { useTransition } from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  function handleLanguageChange(event) {
    const nextLocale = event.target.value;

    startTransition(() => {
      router.replace(pathname, {
        locale: nextLocale,
      });
    });
  }

  return (
    <select
      value={locale}
      onChange={handleLanguageChange}
      disabled={isPending}
      className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
      aria-label="Select language"
    >
      <option value="sw">🇹🇿 Kiswahili</option>
      <option value="en">🇬🇧 English</option>
    </select>
  );
}