import {io} from 'socket.io-client';

// const URL = 'https://chat-server-production-3f2f.up.railway.app/';
// const URL = 'https://chat-server-xjp6.onrender.com/';
const URL = 'https://b355-103-189-227-248.ngrok-free.app';
// const URL = 'https://chat-server-lilac-five.vercel.app/';

export const socket = io(URL, {
  transports: ['websocket'],
});
