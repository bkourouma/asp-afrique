// Use relative URLs in production (Nginx will proxy), absolute URLs in development
const getApiBaseUrl = () => {
  // If explicitly set via env var, use it (but normalize to remove trailing /api)
  if (process.env.NEXT_PUBLIC_API_URL) {
    let apiUrl = process.env.NEXT_PUBLIC_API_URL;
    // Remove trailing /api if present, since endpoints already include /api/v1/...
    if (apiUrl.endsWith('/api')) {
      apiUrl = apiUrl.slice(0, -4); // Remove '/api'
    }
    // Remove trailing slash if present
    if (apiUrl.endsWith('/')) {
      apiUrl = apiUrl.slice(0, -1);
    }
    return apiUrl;
  }
  // In production, use relative URL (Nginx proxies /api to Fastify API)
  if (process.env.NODE_ENV === 'production') {
    return ''; // Empty string = relative URL
  }
  // In development, use localhost
  return 'http://localhost:3002';
};

const API_BASE_URL = getApiBaseUrl();

export const API_URL = API_BASE_URL;

export async function apiGet<T = any>(url: string, params?: Record<string, any>): Promise<T> {
  let searchParams = '';

  if (params) {
    // Filter out special parameters that shouldn't be sent as query params
    const specialParams = ['requireAuth'];

    // Filtrer les paramètres undefined et null
    const filteredParams = Object.entries(params)
      .filter(([key, value]) =>
        !specialParams.includes(key) &&
        value !== undefined &&
        value !== null &&
        value !== ''
      )
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {} as Record<string, any>);

    if (Object.keys(filteredParams).length > 0) {
      searchParams = new URLSearchParams(filteredParams).toString();
    }
  }

  const fullUrl = `${API_BASE_URL}${url}${searchParams ? `?${searchParams}` : ''}`;

  const response = await fetch(fullUrl);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function apiPost(url: string, data: any) {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}

export async function apiPut<T = any>(url: string, data: any): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}

export async function apiDelete<T = any>(url: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}