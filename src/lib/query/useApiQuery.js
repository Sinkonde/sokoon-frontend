import { useQuery } from '@tanstack/react-query';

import apiClient from '@/lib/api/apiClient';

export default function useApiQuery(type, payload = {}, options = {}) {

  return useQuery({

    ...options,

    queryKey: options.queryKey ?? [type, payload],

    queryFn: async () => {

      const response = await apiClient.post('', {
        type,
        payload,
      });

      console.log("FETCHING", type, payload)

      return response.data;

    },

  });

}