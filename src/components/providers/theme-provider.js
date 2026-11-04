'use client';

import {
  ThemeProvider as NextThemesProvider,
} from '@teispace/next-themes';

export default function ThemeProvider({ children }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storage="local"
    >
      {children}
    </NextThemesProvider>
  );
}