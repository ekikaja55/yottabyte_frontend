// src/app/register/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import API from '@/lib/api'
import { saveToken } from '@/utils/auth'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const res = await API.post('/api/auth/register', form)
      const token = res.data.token
      saveToken(token)
      router.push('/login')
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Registrasi gagal')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-xl w-full max-w-md shadow">
        <h1 className="text-2xl font-bold mb-6 text-pink-500 text-center">Daftar</h1>
        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full p-2 mb-4 rounded bg-gray-800 text-white"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 mb-6 rounded bg-gray-800 text-white"
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded font-semibold"
        >
          Daftar
        </button>
      </form>
    </div>
  )
}
