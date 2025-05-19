import {baseApi} from './baseApi';

const conversationApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getConversations: builder.query<any, void>({
      query: userId => ({url: `/conversations/${userId}`}),
    }),
  }),
});

export const {useGetConversationsQuery} = conversationApi;
