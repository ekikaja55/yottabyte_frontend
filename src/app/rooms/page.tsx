'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import API from '@/lib/api'

export default function RoomsPage() {
  const [rooms, setRooms] = useState([])
  const router = useRouter()

  useEffect(() => {
    API.get('/api/rooms')
      .then(res => setRooms(res.data || []))
      .catch(err => console.error('Failed to fetch rooms:', err))
  }, [])

  const handleJoin = (roomId: string) => {
    router.push(`/rooms/${roomId}`)
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Available Rooms</h1>
      <ul className="space-y-4">
        {rooms.map((room: any) => (
          <li
            key={room._id}
            className="border p-4 rounded flex items-center justify-between"
          >
            <span className="font-medium">{room.name}</span>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              onClick={() => handleJoin(room._id)}
            >
              Join
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
