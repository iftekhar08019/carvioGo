// API configuration for both development and production
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://carvio-go-server.vercel.app';

// Function to get the full API URL
export const getApiUrl = (endpoint) => {
  // Remove leading slash if present
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  
  // In development, use relative URLs (which will be proxied by Vite)
  if (import.meta.env.DEV) {
    return `/api/${cleanEndpoint}`;
  }
  
  // In production, use the full URL
  return `${API_BASE_URL}/${cleanEndpoint}`;
};

// Helper function for making API requests
export const apiRequest = async (endpoint, options = {}) => {
  const url = getApiUrl(endpoint);
  
  const defaultOptions = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const finalOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, finalOptions);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API request failed:', response.status, errorText);
      throw new Error(errorText || `HTTP error! status: ${response.status}`);
    }
    
    // Try to parse as JSON, fallback to text if it's not JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    }
    
    return response.text();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

export default {
  getApiUrl,
  apiRequest,
};
