import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { mockApi } from "./mockApi";

export const getDemoQueryFn: <T>() => QueryFunction<T> = <T,>() => async ({ queryKey }): Promise<T> => {
  const path = queryKey.join("/");
  
  if (path.includes('/api/sessions')) {
    return await mockApi.sessions.getAll() as T;
  }
  
  if (path.includes('/api/exercises')) {
    return await mockApi.exercises.getAll() as T;
  }
  
  if (path.includes('/api/bookings')) {
    return await mockApi.bookings.getAll() as T;
  }
  
  if (path.includes('/api/announcements')) {
    return await mockApi.announcements.getAll() as T;
  }
  
  return [] as T;
};

export const demoQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getDemoQueryFn(),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
