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
    findUsers: builder.query<any, string>({
      query: query => ({url: `/users?search=${query}`}),
    }),
    findUserById: builder.query<any, string>({
      query: id => ({url: `/users/${id}`}),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLazyFindUsersQuery,
  useFindUserByIdQuery,
} = userApi;
