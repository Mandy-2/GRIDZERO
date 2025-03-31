'use client'

import { useEffect, useState } from 'react'
import { FiClock } from 'react-icons/fi'

export default function WelcomeStatus() {
  const [isConnected, setIsConnected] = useState(true)
  const [timeString, setTimeString] = useState('')

  // Monitor connection status
  useEffect(() => {
    const updateStatus = () => setIsConnected(navigator.onLine)
    updateStatus()
    window.addEventListener('online', updateStatus)
    window.addEventListener('offline', updateStatus)
    return () => {
      window.removeEventListener('online', updateStatus)
      window.removeEventListener('offline', updateStatus)
    }
  }, [])

  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const formatted = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
      setTimeString(formatted)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed top-4 right-6 z-50 backdrop-blur-md bg-white/5 border border-white/10 text-white px-4 py-2 rounded-xl shadow-lg flex flex-col items-center min-w-[190px]">
      <span className="font-semibold text-sm">Welcome Mandy!</span>

      <div className="flex items-center justify-center gap-6 mt-1 text-xs">
        <div className="flex items-center gap-1 text-[#00ff7f]">
          <FiClock size={14} />
          <span>{timeString}</span>
        </div>
        <div className="flex items-center gap-1 text-white">
          <div
            className={`w-2.5 h-2.5 rounded-full ${
              isConnected ? 'bg-green-400' : 'bg-red-500'
            }`}
          />
          <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
        </div>
      </div>
    </div>
  )
}
