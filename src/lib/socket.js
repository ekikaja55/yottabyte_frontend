import { io } from 'socket.io-client'

export const socket = io('https://yottabytebackend-production.up.railway.app', {
  transports: ['websocket'], // prefer websocket
  reconnectionAttempts: 5
})
