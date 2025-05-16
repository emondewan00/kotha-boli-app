import {baseApi} from './baseApi';

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest extends LoginRequest {
  name: string;
}

type LoginResponse = {
  status: string;
  message: string;
  token?: string;
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
    register: builder.mutation<LoginResponse, RegisterRequest>({
      query: credentials => ({
        url: '/register',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const {useLoginMutation, useRegisterMutation} = userApi;
