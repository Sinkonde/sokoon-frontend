import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin(
  './src/i18n/request.js'
);

const nextConfig = {};

export default withNextIntl(nextConfig);