import { useState, useEffect, useCallback } from 'react';

interface CacheData {
  [key: string]: {
    data: any;
    timestamp: number;
    ttl: number; // Time to live in milliseconds
  };
}

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const cache: CacheData = {};

export function useAdminCache() {
  const [isLoading, setIsLoading] = useState(false);

  const getCachedData = useCallback((key: string) => {
    const cached = cache[key];
    if (cached && Date.now() - cached.timestamp < cached.ttl) {
      return cached.data;
    }
    return null;
  }, []);

  const setCachedData = useCallback((key: string, data: any, ttl: number = CACHE_TTL) => {
    cache[key] = {
      data,
      timestamp: Date.now(),
      ttl
    };
  }, []);

  const invalidateCache = useCallback((key?: string) => {
    if (key) {
      delete cache[key];
    } else {
      Object.keys(cache).forEach(k => delete cache[k]);
    }
  }, []);

  const fetchWithCache = useCallback(async (
    key: string, 
    fetchFn: () => Promise<any>, 
    ttl?: number
  ) => {
    // Check cache first
    const cached = getCachedData(key);
    if (cached) {
      return cached;
    }

    // Fetch fresh data
    setIsLoading(true);
    try {
      const data = await fetchFn();
      setCachedData(key, data, ttl);
      return data;
    } finally {
      setIsLoading(false);
    }
  }, [getCachedData, setCachedData]);

  return {
    getCachedData,
    setCachedData,
    invalidateCache,
    fetchWithCache,
    isLoading
  };
}
