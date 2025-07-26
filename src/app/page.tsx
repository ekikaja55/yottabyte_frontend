// src/app/page.tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 text-center px-4 py-20">
      <motion.h1
        className="text-4xl md:text-6xl font-bold mb-4 text-pink-500"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Yottabyte x Bytespace
      </motion.h1>

      <motion.p
        className="text-gray-300 max-w-xl mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Dengarkan lagu secara real-time bareng teman-temanmu. Masuk ke ruang dengar, putar bareng, dan nikmati playlist kolektif yang sinkron.
      </motion.p>

      <motion.div
        className="flex gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <Link href="/login" className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-6 rounded-xl shadow">
          Masuk
        </Link>
        <Link href="/register" className="bg-white hover:bg-gray-100 text-pink-600 font-semibold py-2 px-6 rounded-xl shadow">
          Daftar
        </Link>
      </motion.div>
    </div>
  )
}
