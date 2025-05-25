import {socket} from '../utils/socket';
import {baseApi} from './baseApi';

interface MessageRequest {
  conversationId: string;
  content: string;
  sender: string;
}

type MessageResponse = {
  _id: string;
  content: string;
  seenBy: string[];
  conversation: string;
  createdAt: string;
  updatedAt: string;
  messageType: 'text';
  sender: {
    _id: string;
    name: string;
  };
  __v: number;
};

const messageApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMessages: builder.query<MessageResponse[], string>({
      query: conversationId => ({
        url: `/conversations/${conversationId}/messages`,
      }),
      async onCacheEntryAdded(
        arg,
        {updateCachedData, cacheDataLoaded, cacheEntryRemoved},
      ) {
        try {
          await cacheDataLoaded;

          socket.on('message', data => {
            updateCachedData(draft => {
              draft.unshift(data);
            });
          });
        } catch (error) {}
        await cacheEntryRemoved;
        socket.off('message');
      },
    }),
    createMessage: builder.mutation<MessageResponse, MessageRequest>({
      query: data => ({
        url: '/messages',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['conversations'],
    }),
  }),
});

export const {useGetMessagesQuery, useCreateMessageMutation} = messageApi;
