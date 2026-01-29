import { getSession } from 'next-auth/react';

// Helper function to get auth token from session
async function getAuthToken(): Promise<string | null> {
  try {
    // Force a fresh session fetch
    const session = await getSession();
    console.log('[API Client] Session retrieved:', { 
      hasSession: !!session, 
      hasAccessToken: !!(session as any)?.accessToken,
      sessionKeys: session ? Object.keys(session) : [],
      userKeys: session?.user ? Object.keys(session.user) : []
    });
    
    if (!session) {
      console.warn('[API Client] No session found');
      return null;
    }
    
    const token = (session as any)?.accessToken;
    if (!token) {
      console.warn('[API Client] Session exists but no accessToken found');
    }
    
    return token || null;
  } catch (error) {
    console.error('[API Client] Failed to get session token:', error);
    return null;
  }
}

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
  return 'http://localhost:3004';
};

// Export API_URL as a getter function to ensure it's always current
export const API_URL = getApiBaseUrl();

export async function apiGet<T = any>(url: string, params?: Record<string, any>): Promise<T> {
  let searchParams = '';
  let apiBaseUrl = '';
  let fullUrl = '';

  try {
    if (params) {
      const specialParams = ['requireAuth'];
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

    apiBaseUrl = getApiBaseUrl();
    fullUrl = `${apiBaseUrl}${url}${searchParams ? `?${searchParams}` : ''}`;

    console.log('[API] Fetching:', fullUrl);

    // Get auth token if requireAuth is not explicitly false
    const requireAuth = params?.requireAuth !== false;
    const headers: HeadersInit = {};
    
    if (requireAuth) {
      const token = await getAuthToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        console.log('[API Client] Token added to request, length:', token.length);
      } else {
        console.warn('[API Client] No token available for authenticated request');
      }
    }

    const response = await fetch(fullUrl, {
      headers
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'No error details');
      
      if (response.status === 404) {
        // Only log 404 as warning, not error, since some endpoints may not exist
        console.warn('[API] 404 Not Found:', fullUrl);
        throw new Error(`HTTP 404: Endpoint not found - ${url}`);
      }
      
      // Only log non-404 errors as errors
      if (response.status !== 404) {
        console.error('[API] HTTP Error:', response.status, response.statusText, fullUrl);
      }
      throw new Error(`HTTP error! status: ${response.status}${errorText ? ` - ${errorText}` : ''}`);
    }

    return response.json();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorName = error instanceof Error ? error.name : 'UnknownError';
    
    // Don't log 404 errors as errors (they're handled gracefully)
    if (!errorMessage.includes('404') && !errorMessage.includes('Not Found')) {
      console.error('[API] Fetch failed:');
      console.error('  URL:', fullUrl || url);
      console.error('  Base URL:', apiBaseUrl || getApiBaseUrl());
      console.error('  Error Type:', errorName);
      console.error('  Error Message:', errorMessage);
    }
    
    if (error instanceof TypeError && (errorMessage === 'Failed to fetch' || errorMessage.includes('fetch'))) {
      throw new Error(`Unable to connect to API. Please check your network connection and ensure the API server is running. URL: ${fullUrl || url}`);
    }
    
    if (error instanceof Error) {
      throw error;
    }
    
    throw new Error(`API request failed: ${String(error)}`);
  }
}

export async function apiPost(url: string, data: any, requireAuth: boolean = true) {
  const apiBaseUrl = getApiBaseUrl();
  const fullUrl = `${apiBaseUrl}${url}`;
  
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (requireAuth) {
      const token = await getAuthToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }
    
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorText = await response.text().catch(() => 'No error details');
      console.error('API POST HTTP error:', {
        url: fullUrl,
        status: response.status,
        statusText: response.statusText,
        errorText,
      });
      throw new Error(`HTTP error! status: ${response.status}${errorText ? ` - ${errorText}` : ''}`);
    }
    
    return response.json();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorName = error instanceof Error ? error.name : 'UnknownError';
    
    console.error('API POST failed:', {
      url: fullUrl,
      apiBaseUrl,
      errorName,
      errorMessage,
      errorType: error instanceof TypeError ? 'TypeError' : error instanceof Error ? 'Error' : typeof error,
    });
    
    if (error instanceof TypeError && (errorMessage === 'Failed to fetch' || errorMessage.includes('fetch'))) {
      throw new Error(`Unable to connect to API. Please check your network connection and ensure the API server is running. URL: ${fullUrl}`);
    }
    
    if (error instanceof Error) {
      throw error;
    }
    
    throw new Error(`API POST request failed: ${String(error)}`);
  }
}

export async function apiPut<T = any>(url: string, data: any, requireAuth: boolean = true): Promise<T> {
  const apiBaseUrl = getApiBaseUrl();
  const fullUrl = `${apiBaseUrl}${url}`;
  
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (requireAuth) {
      const token = await getAuthToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }
    
    const response = await fetch(fullUrl, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorText = await response.text().catch(() => 'No error details');
      console.error('API PUT HTTP error:', {
        url: fullUrl,
        status: response.status,
        statusText: response.statusText,
        errorText,
      });
      throw new Error(`HTTP error! status: ${response.status}${errorText ? ` - ${errorText}` : ''}`);
    }
    
    return response.json();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorName = error instanceof Error ? error.name : 'UnknownError';
    
    console.error('API PUT failed:', {
      url: fullUrl,
      apiBaseUrl,
      errorName,
      errorMessage,
      errorType: error instanceof TypeError ? 'TypeError' : error instanceof Error ? 'Error' : typeof error,
    });
    
    if (error instanceof TypeError && (errorMessage === 'Failed to fetch' || errorMessage.includes('fetch'))) {
      throw new Error(`Unable to connect to API. Please check your network connection and ensure the API server is running. URL: ${fullUrl}`);
    }
    
    if (error instanceof Error) {
      throw error;
    }
    
    throw new Error(`API PUT request failed: ${String(error)}`);
  }
}

export async function apiDelete<T = any>(url: string, requireAuth: boolean = true): Promise<T> {
  const apiBaseUrl = getApiBaseUrl();
  const fullUrl = `${apiBaseUrl}${url}`;
  
  try {
    const headers: HeadersInit = {};
    
    if (requireAuth) {
      const token = await getAuthToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }
    
    const response = await fetch(fullUrl, {
      method: 'DELETE',
      headers
    });
    
    if (!response.ok) {
      const errorText = await response.text().catch(() => 'No error details');
      console.error('API DELETE HTTP error:', {
        url: fullUrl,
        status: response.status,
        statusText: response.statusText,
        errorText,
      });
      throw new Error(`HTTP error! status: ${response.status}${errorText ? ` - ${errorText}` : ''}`);
    }
    
    return response.json();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorName = error instanceof Error ? error.name : 'UnknownError';
    
    console.error('API DELETE failed:', {
      url: fullUrl,
      apiBaseUrl,
      errorName,
      errorMessage,
      errorType: error instanceof TypeError ? 'TypeError' : error instanceof Error ? 'Error' : typeof error,
    });
    
    if (error instanceof TypeError && (errorMessage === 'Failed to fetch' || errorMessage.includes('fetch'))) {
      throw new Error(`Unable to connect to API. Please check your network connection and ensure the API server is running. URL: ${fullUrl}`);
    }
    
    if (error instanceof Error) {
      throw error;
    }
    
    throw new Error(`API DELETE request failed: ${String(error)}`);
  }
}