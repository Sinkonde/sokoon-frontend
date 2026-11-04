import LanguageSwitcher from '@/components/langswitcher';
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('HomePage');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">

      <LanguageSwitcher />

      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold">
          {t('title')}
        </h1>

        <p className="text-gray-500">
          {t('description')}
        </p>
      </div>

    </main>
  );
}