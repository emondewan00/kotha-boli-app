import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://192.168.0.100:3000'}),
  endpoints: () => ({}),
});
