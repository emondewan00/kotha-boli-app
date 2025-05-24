import {baseApi} from './baseApi';

interface MessageRequest {
  conversationId: string;
  text: string;
}

interface MessageResponse {
  _id: string;
  conversationId: string;
  senderId: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

const messageApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMessages: builder.query<any, any>({
      query: conversationId => ({
        url: `/conversations/${conversationId}/messages`,
      }),
    }),
    createMessage: builder.mutation<any, any>({
      query: data => ({
        url: '/messages',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {useGetMessagesQuery, useCreateMessageMutation} = messageApi;
