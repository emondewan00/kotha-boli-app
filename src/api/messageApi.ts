import {RootState} from '../store/store';
import {socket} from '../utils/socket';
import {baseApi} from './baseApi';
import {conversationApi} from './conversationApi';

interface MessageRequest {
  conversationId: string;
  content: string;
  sender: string;
}

export type MessageResponse = {
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

export const messageApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMessages: builder.query<
      {data: MessageResponse[]; hasMore: boolean},
      string
    >({
      query: chatId => ({
        url: `/conversations/${chatId}/messages?page=1`,
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

        if (!userId) {
          return;
        }

        const handleMessage = (data: MessageResponse) => {
          // Update current messages list
          updateCachedData(draft => {
            draft.data.unshift(data);
          });

          // update read message .
          if (data.sender._id !== userId) {
            dispatch(
              messageApi.endpoints.updateMessageSeenStatus.initiate(data._id),
            );
          }

          // Update the conversation list
          dispatch(
            conversationApi.util.updateQueryData(
              'getConversations',
              userId,
              draft => {
                const targetConvIndex = draft.data.findIndex(
                  c => c._id === data.conversation,
                );
                if (targetConvIndex !== -1) {
                  const targetConv = draft.data[targetConvIndex];
                  targetConv.lastMessage = data;
                  draft.data.splice(targetConvIndex, 1); // Remove from current position
                  draft.data.unshift(targetConv); // Move to top
                }
              },
            ),
          );
        };

        try {
          socket.on('message', handleMessage);

          // update unread count
          dispatch(
            conversationApi.util.updateQueryData(
              'getConversations',
              userId,
              draft => {
                const targetConvIndex = draft.data.findIndex(
                  c => c._id === arg,
                );
                draft.data[targetConvIndex].unreadMessageCount = 0;
              },
            ),
          );

          await cacheEntryRemoved;
        } catch (err) {
          console.error('onCacheEntryAdded error:', err);
        } finally {
          socket.off('message', handleMessage);
        }
      },
    }),
    loadMoreMessages: builder.query<
      {data: MessageResponse[]; hasMore: boolean},
      {chatId: string; page: number}
    >({
      query: ({chatId, page}) => ({
        url: `/conversations/${chatId}/messages?page=${page}`,
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;

          if (data && data.data.length > 0) {
            dispatch(
              messageApi.util.updateQueryData(
                'getMessages',
                arg.chatId,
                draft => {
                  const newMessages = [...data.data];
                  const isMatchedLastMessage =
                    draft.data[draft.data.length - 1]._id ===
                    newMessages[0]._id;

                  if (isMatchedLastMessage) {
                    newMessages.shift(); // Remove the last message
                  }

                  draft.data.push(...newMessages);
                  draft.hasMore = data.hasMore;
                },
              ),
            );
          }
        } catch (error) {
          console.error(error);
          console.log('Error loading more messages');
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
    updateMessageSeenStatus: builder.mutation<MessageResponse, string>({
      query: id => ({
        url: '/messages/seen',
        method: 'PATCH',
        body: {messageId: id},
      }),
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useCreateMessageMutation,
  useLazyLoadMoreMessagesQuery,
} = messageApi;
