'use client';

import {
  useRef,
  useState,
} from 'react';

import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache,
} from '@tanstack/react-query';

import { useTranslations } from 'next-intl';

import { Toaster, toast } from 'sonner';
import { getApiErrorKey } from '@/lib/api/apiError';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function QueryProvider({ children }) {

  const t = useTranslations('errors');

  // Keep translations updated when language changes
  const translationRef = useRef(t);

  translationRef.current = t;

  const [queryClient] = useState(() => {

    // Centralized error notification
    const showGlobalError = (error, meta) => {

      if (meta?.showGlobalError === false) {
        return;
      }

      const errorKey = getApiErrorKey(error);

      if (!errorKey) {
        return;
      }

      const validationMessage =  error.status === 422
            ? Object.values(error.errors || {})
                .flat()
                .find((item) => typeof item === 'string')
            : null;

const message = validationMessage || translationRef.current(errorKey);

      toast.error(message, {
        id: `api-error-${errorKey}`,
        duration: 4500,
      });
    };

    return new QueryClient({

      // Global query error handling
      queryCache: new QueryCache({

        onError: (error, query) => {
          showGlobalError(error, query.meta);
        },

      }),

      // Global mutation error handling
      mutationCache: new MutationCache({

        onError: (
          error,
          variables,
          context,
          mutation
        ) => {
          showGlobalError(error, mutation.meta);
        },

      }),

      defaultOptions: {

        queries: {

          staleTime: 30 * 1000,

          gcTime: 5 * 60 * 1000,

          retry: (failureCount, error) => {

            // Do not retry normal HTTP client errors
            if (
              error.status >= 400 &&
              error.status < 500
            ) {
              return false;
            }

            // Retry server/network errors once
            return failureCount < 1;
          },

          refetchOnWindowFocus: true,

          refetchOnReconnect: true,

        },

        mutations: {

          retry: false,

        },

      },

    });

  });

  return (
    <QueryClientProvider client={queryClient}>

      {children}

      <Toaster
        position="top-right"
        richColors
        closeButton
        duration={4500}
      />

      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}

    </QueryClientProvider>
  );
}