import {baseApi} from './baseApi';

interface ConversationRequest {
  members: string[];
  name?: string;
  image?: string;
  type: 'private' | 'group';
}

export type ConversationResponse = ConversationRequest & {
  _id: string;
  lastMessage?: {
    content: string;
    createdAt: string;
    sender: {
      _id: string;
      name: string;
    };
  };
  members: {_id: string; name: string}[];
};

export const conversationApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getConversations: builder.query<ConversationResponse[], string>({
      query: userId => ({url: `/users/${userId}/conversations`}),
      providesTags: ['conversations'],
    }),
    createConversation: builder.mutation<
      ConversationResponse,
      ConversationRequest
    >({
      query: data => ({
        url: '/conversations',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['conversations'],
    }),
  }),
});

export const {useGetConversationsQuery, useCreateConversationMutation} =
  conversationApi;
