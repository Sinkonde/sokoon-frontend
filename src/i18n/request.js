import * as rootParams from 'next/root-params';
import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';

import { routing } from './routing';

import sw from '../../lang/sw/index.js';
import en from '../../lang/en/index.js';

const translations = {
  sw,
  en,
};

export default getRequestConfig(async ({ locale }) => {
  let currentLocale = locale;

  if (!currentLocale) {
    currentLocale = await rootParams.locale();
  }

  if (!hasLocale(routing.locales, currentLocale)) {
    notFound();
  }

  return {
    locale: currentLocale,
    messages: translations[currentLocale],
    timeZone: 'Africa/Dar_es_Salaam',
  };
});