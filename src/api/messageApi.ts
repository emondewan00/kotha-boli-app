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
        await cacheDataLoaded;

        const state = getState() as RootState;
        const userId = state.auth.user?._id;

        if (!userId) {return;}

        const handleMessage = (data: MessageResponse) => {
          // Update current messages list
          updateCachedData(draft => {
            draft.unshift(data);
          });

          // Update the conversation list
          dispatch(
            conversationApi.util.updateQueryData(
              'getConversations',
              userId,
              (draft: Draft<ConversationResponse[]>) => {
                const targetConvIndex = draft.findIndex(
                  c => c._id === data.conversation,
                );
                if (targetConvIndex !== -1) {
                  const targetConv = draft[targetConvIndex];
                  targetConv.lastMessage = data;
                  draft.splice(targetConvIndex, 1); // Remove from current position
                  draft.unshift(targetConv); // Move to top
                }
              },
            ),
          );
        };

        try {
          socket.on('message', handleMessage);
          await cacheEntryRemoved;
        } catch (err) {
          console.error('onCacheEntryAdded error:', err);
        } finally {
          socket.off('message', handleMessage);
        }
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
