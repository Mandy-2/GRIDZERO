'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Cpu,
  MemoryStick,
  BatteryCharging,
  Thermometer,
  Monitor
} from 'lucide-react'

export default function SystemMonitor() {
  const [stats, setStats] = useState({
    cpu: 0,
    ram: 0,
    battery: { percent: 'N/A', plugged: false },
    temperature: 'N/A',
  })

  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch('http://localhost:8000/api/stats')
        const data = await res.json()
        setStats(data)
      } catch (err) {
        console.error('System stats fetch failed', err)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const getColor = (value: number) => {
    if (value > 80) return 'bg-red-500'
    if (value > 50) return 'bg-yellow-400'
    return 'bg-green-500'
  }

  const safeParse = (val: any) => {
    const parsed = parseFloat(val)
    return isNaN(parsed) ? 0 : parsed
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="glass p-4 rounded-2xl border border-white/10 cursor-pointer hover:bg-white/10 transition duration-300"
      onClick={() => router.push('/system')}
    >
      <div className="flex items-center gap-2 mb-4">
        <Monitor className="w-5 h-5 text-neon" />
        <h3 className="text-lg font-semibold text-neon font-square">System Monitor</h3>
      </div>

      {/* CPU Usage */}
      <div className="mb-3">
        <div className="flex items-center gap-2 mb-1">
          <Cpu className="w-4 h-4 text-gray-300" />
          <p className="text-sm text-gray-300">CPU Usage: {stats.cpu}%</p>
        </div>
        <div className="w-full h-3 bg-gray-700 rounded">
          <div
            className={`${getColor(stats.cpu)} h-3 rounded transition-all duration-500`}
            style={{ width: `${stats.cpu}%` }}
          />
        </div>
      </div>

      {/* RAM Usage */}
      <div className="mb-3">
        <div className="flex items-center gap-2 mb-1">
          <MemoryStick className="w-4 h-4 text-gray-300" />
          <p className="text-sm text-gray-300">RAM Usage: {stats.ram}%</p>
        </div>
        <div className="w-full h-3 bg-gray-700 rounded">
          <div
            className={`${getColor(stats.ram)} h-3 rounded transition-all duration-500`}
            style={{ width: `${stats.ram}%` }}
          />
        </div>
      </div>

      {/* Battery */}
      <div className="mb-3">
        <div className="flex items-center gap-2 mb-1">
          <BatteryCharging className="w-4 h-4 text-gray-300" />
          <p className="text-sm text-gray-300">
            Battery: {stats.battery.percent}%
            {stats.battery.plugged ? ' (Charging)' : ''}
          </p>
        </div>
        <div className="w-full h-3 bg-gray-700 rounded">
          <div
            className={`${getColor(safeParse(stats.battery.percent))} h-3 rounded transition-all duration-500`}
            style={{ width: `${safeParse(stats.battery.percent)}%` }}
          />
        </div>
      </div>

      {/* Temperature */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Thermometer className="w-4 h-4 text-gray-300" />
          <p className="text-sm text-gray-300">
            Temperature: {stats.temperature}°C
          </p>
        </div>
        <div className="w-full h-3 bg-gray-700 rounded">
          <div
            className={`${
              stats.temperature !== 'N/A'
                ? getColor(parseFloat(stats.temperature))
                : 'bg-gray-400'
            } h-3 rounded transition-all duration-500`}
            style={{
              width:
                stats.temperature !== 'N/A'
                  ? `${parseFloat(stats.temperature)}%`
                  : '0%',
            }}
          />
        </div>
      </div>
    </motion.div>
  )
}
