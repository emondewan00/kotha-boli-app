import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_BASE_URL} from '@env';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({baseUrl: API_BASE_URL}),
  endpoints: () => ({}),
});
