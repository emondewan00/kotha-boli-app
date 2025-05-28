import {Draft} from '@reduxjs/toolkit';
import {RootState} from '../store/store';
import {socket} from '../utils/socket';
import {baseApi} from './baseApi';
import {conversationApi, ConversationResponse} from './conversationApi';

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
        {
          updateCachedData,
          cacheDataLoaded,
          cacheEntryRemoved,
          getState,
          dispatch,
        },
      ) {
        try {
          await cacheDataLoaded;
          const userId = (getState() as RootState).auth.user?._id as string;

          socket.on('message', data => {
            updateCachedData(draft => {
              draft.unshift(data);
            });

            dispatch(
              conversationApi.util.updateQueryData(
                'getConversations',
                userId,
                (draft: Draft<ConversationResponse[]>) => {
                  const conv = draft.find(c => c._id === data.conversation);
                  if (conv) {
                    conv.lastMessage = data;
                  }
                },
              ),
            );
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
    }),
  }),
});

export const {useGetMessagesQuery, useCreateMessageMutation} = messageApi;
