import {io} from 'socket.io-client';
import {API_BASE_URL} from '@env';

// const URL = 'https://chat-server-production-3f2f.up.railway.app/';
// const URL = 'https://chat-server-xjp6.onrender.com/';
// const URL = 'https://f9a1-103-189-227-248.ngrok-free.app';
// const URL = 'https://chat-server-lilac-five.vercel.app/';

export const socket = io(API_BASE_URL, {
  transports: ['websocket'],
});
