import { useQuery } from '@tanstack/react-query';

import apiClient from '@/lib/api/apiClient';

export default function useApiQuery(
  type,
  payload = {},
  options = {}
) {

  const { queryKey, ...queryOptions } = options;

  return useQuery({

    ...queryOptions,

    queryKey: queryKey ?? ['api', type, payload],

    queryFn: async ({ signal }) => {

      const response = await apiClient.post(
        '',
        {
          type,
          payload,
        },
        {
          signal,
        }
      );

      return response.data;
    },

  });
}