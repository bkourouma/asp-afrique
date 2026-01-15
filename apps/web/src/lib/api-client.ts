// Use relative URLs in production (Nginx will proxy), absolute URLs in development
// This function is called at runtime to get the API base URL
const getApiBaseUrl = () => {
  // Check both runtime and build-time env vars
  // Next.js replaces process.env.NEXT_PUBLIC_* at build time, so we need to check both
  const envApiUrl = typeof window !== 'undefined' 
    ? (window as any).__NEXT_DATA__?.env?.NEXT_PUBLIC_API_URL || (process.env as any).NEXT_PUBLIC_API_URL
    : (process.env as any).NEXT_PUBLIC_API_URL;
  
  // Normalize and validate the API URL - handle string "undefined" from build-time replacement
  const apiUrlStr = envApiUrl ? String(envApiUrl).trim() : '';
  if (apiUrlStr && apiUrlStr !== 'undefined' && apiUrlStr !== 'null' && apiUrlStr !== '') {
    let apiUrl = apiUrlStr;
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
  
  // In production (when not localhost), use relative URL (Nginx proxies /api to Fastify API)
  if (typeof window !== 'undefined') {
    const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
    if (isProduction) {
      return ''; // Empty string = relative URL
    }
  } else if (process.env.NODE_ENV === 'production') {
    return ''; // Empty string = relative URL for server-side
  }
  
  // In development, use localhost
  return 'http://localhost:3002';
};

// Call the function at runtime, not build time
// This ensures we get the correct value even if env var was undefined at build time
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