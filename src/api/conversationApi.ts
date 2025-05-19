import {baseApi} from './baseApi';

interface ConversationRequest {
  members: string[];
  name?: string;
  image?: string;
  type: 'private' | 'group';
}

type ConversationResponse = ConversationRequest & {
  _id: string;
  lastMessage?: any;
  members: {_id: string; name: string}[];
};

const conversationApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getConversations: builder.query<ConversationResponse, void>({
      query: userId => ({url: `/users/${userId}/conversations`}),
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
    }),
  }),
});

export const {useGetConversationsQuery, useCreateConversationMutation} =
  conversationApi;
