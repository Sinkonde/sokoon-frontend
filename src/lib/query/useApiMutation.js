import { useMutation } from '@tanstack/react-query';

import apiClient from '@/lib/api/apiClient';

export default function useApiMutation(
  type,
  options = {}
) {

  return useMutation({

    ...options,

    mutationFn: async (payload = {}) => {

      const response = await apiClient.post(
        '',
        {
          type,
          payload,
        }
      );

      return response.data;
    },

  });
}