export class ApiError extends Error {
    constructor({
      message,
      status = 0,
      code = null,
      errors = null,
      data = null,
    }) {
      super(message);
  
      this.name = 'ApiError';
      this.status = status;
      this.code = code;
      this.errors = errors;
      this.data = data;
    }
  }
  
  // Convert Axios errors into ApiError
  export function normalizeAxiosError(error) {
  
    // Ignore cancelled requests
    if (
      error.code === 'ERR_CANCELED' ||
      error.name === 'CanceledError'
    ) {
      return error;
    }
  
    // HTTP response errors
    if (error.response) {
      const data = error.response.data;
  
      return new ApiError({
        message:
          data?.message || 'Request failed',
  
        status: error.response.status,
  
        code: data?.code || error.code,
  
        errors: data?.errors || null,
  
        data,
      });
    }
  
    // Timeout errors
    const isTimeout = [
      'ECONNABORTED',
      'ETIMEDOUT',
    ].includes(error.code);
  
    // Network errors
    return new ApiError({
      message: isTimeout
        ? 'Request timeout'
        : 'Network connection failed',
  
      status: 0,
  
      code: isTimeout
        ? 'TIMEOUT'
        : 'NETWORK_ERROR',
    });
  }
  
  // Determine translation key
  export function getApiErrorKey(error) {
  
    if (
      error.code === 'ERR_CANCELED' ||
      error.name === 'CanceledError'
    ) {
      return null;
    }
  
    if (error.code === 'TIMEOUT') {
      return 'timeout';
    }
  
    if (error.status === 0) {
      return 'network';
    }
  
    const errorKeys = {
      400: 'badRequest',
      401: 'unauthenticated',
      403: 'forbidden',
      404: 'notFound',
      409: 'conflict',
      422: 'validation',
      429: 'rateLimit',
      500: 'serverError',
      502: 'backendUnavailable',
      503: 'backendUnavailable',
      504: 'backendUnavailable',
    };
  
    return errorKeys[error.status] || 'requestFailed';
  }