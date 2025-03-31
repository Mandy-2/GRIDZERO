'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Monitor,
  Cpu,
  MemoryStick,
  BatteryCharging,
  Thermometer,
  Info,
  Terminal,
} from 'lucide-react'

export default function SystemMonitorPage() {
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
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-x-4 top-24 bottom-4 px-6 py-6 text-white font-mono bg-black/40 backdrop-blur-md rounded-3xl border border-white/10 z-20"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Monitor className="w-5 h-5 text-neon" />
          <h1 className="text-2xl font-bold text-neon font-square">System Monitor</h1>
        </div>

        <button
          onClick={() => router.push('/')}
          className="text-xs px-3 py-1 border border-white/20 rounded-md hover:bg-white/10 transition"
        >
          ← Back
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 text-xs">
        {/* CPU */}
        <div className="glass p-4 rounded-lg border border-white/10">
          <div className="flex items-center gap-1 mb-1">
            <Cpu className="w-4 h-4 text-neon" />
            <p className="font-semibold text-neon">CPU</p>
          </div>
          <p className="mb-2 text-gray-300">{stats.cpu}%</p>
          <div className="w-full h-2 bg-gray-700 rounded">
            <div
              className={`${getColor(stats.cpu)} h-2 rounded transition-all duration-500`}
              style={{ width: `${stats.cpu}%` }}
            />
          </div>
        </div>

        {/* RAM */}
        <div className="glass p-4 rounded-lg border border-white/10">
          <div className="flex items-center gap-1 mb-1">
            <MemoryStick className="w-4 h-4 text-neon" />
            <p className="font-semibold text-neon">RAM</p>
          </div>
          <p className="mb-2 text-gray-300">{stats.ram}%</p>
          <div className="w-full h-2 bg-gray-700 rounded">
            <div
              className={`${getColor(stats.ram)} h-2 rounded transition-all duration-500`}
              style={{ width: `${stats.ram}%` }}
            />
          </div>
        </div>

        {/* Battery */}
        <div className="glass p-4 rounded-lg border border-white/10">
          <div className="flex items-center gap-1 mb-1">
            <BatteryCharging className="w-4 h-4 text-neon" />
            <p className="font-semibold text-neon">Battery</p>
          </div>
          <p className="mb-2 text-gray-300">
            {stats.battery.percent}% {stats.battery.plugged ? '(Charging)' : ''}
          </p>
          <div className="w-full h-2 bg-gray-700 rounded">
            <div
              className={`${getColor(safeParse(stats.battery.percent))} h-2 rounded transition-all duration-500`}
              style={{ width: `${safeParse(stats.battery.percent)}%` }}
            />
          </div>
        </div>

        {/* Temperature */}
        <div className="glass p-4 rounded-lg border border-white/10 col-span-1">
          <div className="flex items-center gap-1 mb-1">
            <Thermometer className="w-4 h-4 text-neon" />
            <p className="font-semibold text-neon">Temp</p>
          </div>
          <p className="mb-2 text-gray-300">
            {stats.temperature !== 'N/A' ? `${stats.temperature}°C` : 'Unavailable'}
          </p>
          <div className="w-full h-2 bg-gray-700 rounded">
            <div
              className={`${
                stats.temperature !== 'N/A'
                  ? getColor(parseFloat(stats.temperature))
                  : 'bg-gray-400'
              } h-2 rounded transition-all duration-500`}
              style={{
                width:
                  stats.temperature !== 'N/A'
                    ? `${parseFloat(stats.temperature)}%`
                    : '0%',
              }}
            />
          </div>
        </div>

        {/* System Profile */}
        <div className="glass p-4 rounded-lg border border-white/10 col-span-2">
          <div className="flex items-center gap-1 mb-2">
            <Info className="w-4 h-4 text-neon" />
            <p className="font-semibold text-neon">Profile</p>
          </div>
          <div className="text-gray-300 space-y-1 text-xs">
            <p>🖥️ Hostname: GRIDZER0</p>
            <p>📀 OS: Ubuntu 22.04</p>
            <p>🧠 CPU: Intel Core i7-9750H</p>
            <p>🧬 Kernel: 6.5.0-generic</p>
            <p>🕒 Uptime: 1 day, 5 hours</p>
          </div>
        </div>

        {/* Terminal */}
        <div className="glass p-3 rounded-lg border border-white/10 col-span-3 h-40 overflow-hidden">
          <div className="flex items-center gap-1 mb-1">
            <Terminal className="w-4 h-4 text-neon" />
            <p className="font-semibold text-neon">Terminal</p>
          </div>
          <div className="text-[10px] font-mono text-green-400 h-full overflow-y-auto whitespace-pre-wrap leading-snug">
            <p>$ top - 16:10:51 up  1:23,  1 user,  load average: 0.58, 0.76, 0.84</p>
            <p>Tasks: 212 total,  1 running, 211 sleeping</p>
            <p>Cpu(s): 3.1%us, 1.0%sy, 0.0%ni, 95.6%id</p>
            <p>Mem: 16GB total, 5GB used, 11GB free</p>
            <p>PID USER  PR  NI  VIRT  RES  SHR S %CPU %MEM TIME+ COMMAND</p>
            <p>1142 root  20   0  412m  82m  49m S  6.0  0.5  0:11.31 Xorg</p>
            <p>2276 user  20   0 1420m 114m  68m S  4.3  0.7  0:06.89 gnome-shell</p>
            <p>2345 user  20   0  823m  64m  37m S  2.7  0.4  0:03.42 chrome</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
