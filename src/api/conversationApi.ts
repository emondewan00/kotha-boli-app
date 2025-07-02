import {socket} from '../utils/socket';
import {baseApi} from './baseApi';

interface ConversationRequest {
  members: string[];
  name?: string;
  image?: string;
  type: 'private' | 'group';
}

export type Conversation = ConversationRequest & {
  _id: string;
  lastMessage?: {
    _id: string;
    content: string;
    createdAt: string;
    sender: {
      _id: string;
      name: string;
    };
  };
  members: {_id: string; name: string}[];
  isOnline: string;
  updatedAt: string;
  name: string;
};

export const conversationApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getConversations: builder.query<
      {data: Conversation[]; hasMore: boolean},
      string
    >({
      query: userId => ({url: `/users/${userId}/conversations`}),
      async onCacheEntryAdded(
        arg,
        {cacheDataLoaded, cacheEntryRemoved, updateCachedData},
      ) {
        try {
          await cacheDataLoaded;

          // New conversation comes in, add to beginning of the list
          socket.on('newConversation', (data: Conversation) => {
            updateCachedData(draft => {
              // Avoid duplicate insert if conversation already exists
              if (!draft.data.find(c => c._id === data._id)) {
                draft.data.unshift(data);
              }
            });
          });

          // New message in existing conversation - bring it to top
          socket.on('newMessage', (data: Conversation) => {
            updateCachedData(draft => {
              const existingIndex = draft.data.findIndex(
                c => c._id === data._id,
              );
              if (existingIndex !== -1) {
                draft.data.splice(existingIndex, 1); // Remove from current position
              }
              draft.data.unshift(data); // Move to top
            });
          });

          // update conversation online status real-time
          socket.on(
            'user-status',
            (data: {conversationId: string; isOnline: string}) => {
              updateCachedData(draft => {
                const existingIndex = draft.data.findIndex(
                  c => c._id === data.conversationId,
                );
                if (existingIndex !== -1) {
                  draft.data[existingIndex].isOnline = data.isOnline;
                }
              });
            },
          );
        } catch (error) {
          console.error('Error in onCacheEntryAdded:', error);
        }

        await cacheEntryRemoved;
        socket.off('newMessage');
        socket.off('newConversation');
      },
    }),

    loadMoreConversations: builder.query<
      {data: Conversation[]; hasMore: boolean},
      {userId: string; page: number}
    >({
      query: ({userId, page}) => ({
        url: `/users/${userId}/conversations?page=${page}`,
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const result = await queryFulfilled;

          dispatch(
            conversationApi.util.updateQueryData(
              'getConversations',
              arg.userId,
              draft => {
                const lastExisting = draft.data[draft.data.length - 1];
                const newData = result.data.data;

                // Avoid duplicate if paginated data includes the last conversation
                const isDuplicate =
                  lastExisting &&
                  newData.length > 0 &&
                  lastExisting._id === newData[0]._id;

                if (isDuplicate) {
                  newData.shift();
                }

                draft.data.push(...newData);
                draft.hasMore = result.data.hasMore;
              },
            ),
          );
        } catch (error) {
          console.error('Error loading more conversations', error);
        }
      },
    }),

    createConversation: builder.mutation<Conversation, ConversationRequest>({
      query: data => ({
        url: '/conversations',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetConversationsQuery,
  useCreateConversationMutation,
  useLazyLoadMoreConversationsQuery,
} = conversationApi;
