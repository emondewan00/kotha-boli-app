import {baseApi} from './baseApi';

interface LoginRequest {
  email: string;
  password: string;
}

type LoginResponse = {
  status: string;
  message: string;
  token: string;
  user?: {
    _id: string;
    email: string;
    name: string;
  };
};

export const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: credentials => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const {useLoginMutation} = userApi;
