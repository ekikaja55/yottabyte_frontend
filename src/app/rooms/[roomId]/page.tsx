// src/app/rooms/[roomId]/page.tsx
'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSocket } from '@/hooks/useSocket'

export default function RoomPage() {
  const { roomId } = useParams()


  const socket = useSocket()

  const [state, setState] = useState<any>(null)
  const [queue, setQueue] = useState<any[]>([])

  useEffect(() => {
    if (!socket || !roomId) return;

    if (!socket.connected) {
      socket.on('connect', () => {
        socket.emit('join-room', { roomId: roomId })
      })
    } else {
      socket.emit('join-room', { roomId: roomId })
    }

    socket.on('sync-state', (newState) => {
      setState(newState)
    })

    socket.on('queue-updated', (newQueue) => {
      setQueue(newQueue)
    })

    return () => {
      socket.off('sync-state')
      socket.off('queue-updated')
    }
  }, [socket, roomId])

  return (
      <div className="p-8">
      <h1 className="text-2xl text-white font-bold">Room ID: {roomId}</h1>

      <div className="mt-4">
        <p>Current State:</p>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </div>

      <div className="mt-4">
        <p>Queue:</p>
        <ul>
          {queue.map((item, index) => (
            <li key={index}>{item.title || 'Unknown Song'}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
