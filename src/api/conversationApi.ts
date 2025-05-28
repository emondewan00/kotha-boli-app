import {socket} from '../utils/socket';
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
      async onCacheEntryAdded(
        arg,
        {cacheDataLoaded, cacheEntryRemoved, updateCachedData},
      ) {
        try {
          await cacheDataLoaded;

          socket.on('newMessage', data => {
            updateCachedData(draft => {
              const filtered = draft.filter(c => {
                return c._id !== data._id;
              });
              filtered.unshift(data);
              return filtered;
            });
          });
        } catch (error) {}
        await cacheEntryRemoved;
        socket.off('newMessage');
      },
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
