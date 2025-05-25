import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
} from '@reduxjs/toolkit/query/react';
import {API_BASE_URL} from '@env';
import {logout} from '../features/authSlice';
import {RootState} from '../store/store';

// base query
const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, {getState, endpoint}) => {
    if (endpoint === 'login' || endpoint === 'register') {
      return headers;
    }
    const token = (getState() as RootState).auth.token;
    if (token && typeof token === 'string') {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn = async (
  args,
  api,
  extraOptions,
) => {
  const result = await baseQuery(args, api, extraOptions);

  // Check if unauthorized
  if (result?.error?.status === 401) {
    api.dispatch(logout());
  }

  
  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['conversations'],
  endpoints: () => ({}),
});
