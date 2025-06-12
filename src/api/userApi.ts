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

type User = {
  _id: string;
  email: string;
  name: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
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
    findUsers: builder.query<{data: User[]; hasMore: boolean}, string>({
      query: query => ({url: `/users?search=${query}`}),
    }),
    loadMoreUsersByQuery: builder.query<
      {data: User[]; hasMore: boolean},
      {query: string; page: number}
    >({
      query: ({query, page}) => ({
        url: `/users?search=${query}&page=${page}`,
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;

          if (data && data.data.length > 0) {
            dispatch(
              userApi.util.updateQueryData('findUsers', arg.query, draft => {
                draft.data.push(...data.data);
                draft.hasMore = data.hasMore;
              }),
            );
          }
        } catch (error) {
          console.error('Error loading more users:', error);
        }
      },
    }),
    findUserById: builder.query<User, string>({
      query: id => ({url: `/users/${id}`}),
    }),
    updateFcmToken: builder.mutation<{message: string}, string>({
      query: fcmToken => ({
        url: '/users/update-fcm-token',
        method: 'PATCH',
        body: {fcmToken},
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLazyFindUsersQuery,
  useFindUserByIdQuery,
  useLazyLoadMoreUsersByQueryQuery,
} = userApi;
