/**
 * API service for NEXORA.
 * Reads backend URL from VITE_API_URL or defaults to http://localhost:9000
 * Ensures proper network routing across LAN (PC 1 -> PC 2).
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:9000';

export async function fetchApi(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `API request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.warn(`API request error on ${url}:`, error.message);
    throw error;
  }
}

export const api = {
  // Products
  getProducts: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.category && params.category !== 'all') query.append('category', params.category);
    if (params.search) query.append('search', params.search);
    if (params.featured !== undefined) query.append('featured', params.featured);
    if (params.flash_sale !== undefined) query.append('flash_sale', params.flash_sale);
    if (params.sort) query.append('sort', params.sort);
    
    const qs = query.toString();
    return fetchApi(`/api/products${qs ? `?${qs}` : ''}`);
  },

  getProductById: async (id) => {
    return fetchApi(`/api/products/${id}`);
  },

  getCategories: async () => {
    return fetchApi('/api/categories');
  },

  // Cart
  getCart: async (userId) => {
    return fetchApi(`/api/cart/${userId}`);
  },

  updateCart: async (userId, items) => {
    return fetchApi('/api/cart', {
      method: 'POST',
      body: JSON.stringify({ user_id: userId, items })
    });
  },

  // Orders & Payment
  createOrder: async (orderData) => {
    return fetchApi('/api/orders', {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
  },

  getUserOrders: async (userId) => {
    return fetchApi(`/api/orders/${userId}`);
  },

  processPayment: async (paymentData) => {
    return fetchApi('/api/payment', {
      method: 'POST',
      body: JSON.stringify(paymentData)
    });
  },

  // Health
  checkHealth: async () => {
    return fetchApi('/api/health');
  }
};
