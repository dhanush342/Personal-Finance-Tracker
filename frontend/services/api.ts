// API Base URL - Adjust based on environment. Use relative '/api' so Vite proxy can forward requests to the backend in development.
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Error handling
class APIError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'APIError';
  }
}

// Generic fetch function with error handling
async function fetchAPI(
  endpoint: string,
  options: RequestInit = {}
): Promise<any> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    // Attach auth token from localStorage when available
    const token = localStorage.getItem('token');
    const headers: Record<string,string> = {
      'Content-Type': 'application/json',
      ...((options.headers as Record<string,string>) || {}),
    };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new APIError(response.status, error.error || 'API Error');
    }

    // Handle empty responses (like DELETE)
    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new Error(`Failed to fetch ${endpoint}: ${error}`);
  }
}

// Transaction APIs
export const transactionAPI = {
  getAll: (filters?: {
    category?: string;
    type?: 'income' | 'expense';
    startDate?: string;
    endDate?: string;
  }) => {
    const params = new URLSearchParams(filters as any).toString();
    return fetchAPI(`/transactions${params ? `?${params}` : ''}`);
  },

  getById: (id: string) => fetchAPI(`/transactions/${id}`),

  create: (data: any) =>
    fetchAPI('/transactions', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: any) =>
    fetchAPI(`/transactions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    fetchAPI(`/transactions/${id}`, {
      method: 'DELETE',
    }),

  getStatistics: (filters?: {
    startDate?: string;
    endDate?: string;
  }) => {
    const params = new URLSearchParams(filters as any).toString();
    return fetchAPI(`/transactions/statistics${params ? `?${params}` : ''}`);
  },
};

// Budget APIs
export const budgetAPI = {
  getAll: (month?: string) => {
    const params = month ? `?month=${month}` : '';
    return fetchAPI(`/budgets${params}`);
  },

  create: (data: any) =>
    fetchAPI('/budgets', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: any) =>
    fetchAPI(`/budgets/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    fetchAPI(`/budgets/${id}`, {
      method: 'DELETE',
    }),

  getStatus: (month: string) =>
    fetchAPI(`/budgets/status?month=${month}`),
};

// Category APIs
export const categoryAPI = {
  getAll: () => fetchAPI('/categories'),

  getDefaults: () => fetchAPI('/categories/defaults'),

  create: (data: any) =>
    fetchAPI('/categories', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: any) =>
    fetchAPI(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    fetchAPI(`/categories/${id}`, {
      method: 'DELETE',
    }),

  initializeDefaults: () =>
    fetchAPI('/categories/init/defaults', {
      method: 'POST',
    }),
};

export { APIError };
export default { transactionAPI, budgetAPI, categoryAPI };
