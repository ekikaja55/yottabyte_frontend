// src/hooks/useSocket.ts
import { useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null)
  const [socketReady, setSocketReady] = useState(false)

  useEffect(() => {
    socketRef.current = io(SOCKET_URL, {
      transports: ['websocket'],
    })

    socketRef.current.on('connect', () => {
      setSocketReady(true)
      console.log('Connected to socket server')
    })

    socketRef.current.on('disconnect', () => {
      setSocketReady(false)
      console.log('Disconnected from socket server')
    })

    return () => {
      socketRef.current?.disconnect()
    }
  }, [])

  return socketReady ? socketRef.current : null
}
