
'use client';

import {
  useRef,
  useState,
} from 'react';

import {
  QueryClient,
  QueryCache,
  MutationCache,
} from '@tanstack/react-query';

import {PersistQueryClientProvider,} from '@tanstack/react-query-persist-client';

import {
  createAsyncStoragePersister,
} from '@tanstack/query-async-storage-persister';

import { useTranslations } from 'next-intl';

import { Toaster, toast } from 'sonner';
import { getApiErrorKey } from '@/lib/api/apiError';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import queryStorage from '@/lib/db/query-storage';

export default function QueryProvider({ children }) {

  const t = useTranslations('errors');

  const translationRef = useRef(t);

  translationRef.current = t;

  const [queryClient] = useState(() => {

    const showGlobalError = (error, meta) => {

      if (meta?.showGlobalError === false) {
        return;
      }

      const errorKey = getApiErrorKey(error);

      if (!errorKey) {
        return;
      }

      const validationMessage = error.status === 422
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

      queryCache: new QueryCache({

        onError: (error, query) => {
          showGlobalError(error, query.meta);
        },

      }),

      mutationCache: new MutationCache({

        onError: (error, variables, context, mutation) => {
          showGlobalError(error, mutation.meta);
        },

      }),

      defaultOptions: {

        queries: {

          staleTime: 30 * 1000,

          // Cache itaendelea kuwepo kwenye memory kwa muda mrefu.
          gcTime: 24 * 60 * 60 * 1000,

          networkMode: 'online',

          retry: (failureCount, error) => {

            if (
              error.status >= 400 &&
              error.status < 500
            ) {
              return false;
            }

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

  const [persister] = useState(() => {

    return createAsyncStoragePersister({

      storage: queryStorage,

      key: 'SHOPLINK_QUERY_CACHE',

      throttleTime: 1000,

    });

  });

  return (

    <PersistQueryClientProvider

      client={queryClient}

      persistOptions={{

        persister,

        maxAge: 7 * 24 * 60 * 60 * 1000,

        buster: 'shoplink-cache-v1',

      }}

    >

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

    </PersistQueryClientProvider>

  );

}
