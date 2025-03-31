'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { AnimatePresence, motion } from 'framer-motion'
import TopMenuBar from '@/components/TopMenuBar'
import WelcomeStatus from '@/components/WelcomeStatus'
import GridBackground from '@/components/GridBackground'
import SystemPage from './system/page'

const SystemMonitor = dynamic(() => import('@/components/SystemMonitor'), { ssr: false })

export default function Home() {
  const [view, setView] = useState<'dashboard' | 'system'>('dashboard')

  return (
    <div className="relative h-screen text-white bg-[#0a0a0a] font-mono overflow-hidden">
      <GridBackground />
      <TopMenuBar title="" />
      <WelcomeStatus />

      <main className="pt-20 px-6 h-full overflow-y-auto relative z-10">
        <AnimatePresence mode="wait">
          {view === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              {/* Removed h2 title from here */}

              <div className="grid grid-cols-3 gap-6">
                <SystemMonitor onClick={() => setView('system')} />

                <div className="bg-white/10 p-4 rounded-2xl border border-white/20 glass">
                  <h3 className="text-lg font-semibold mb-2 text-neon">Widget 2</h3>
                  <p className="text-sm text-gray-300">This space is for another panel.</p>
                </div>

                <div className="bg-white/10 p-4 rounded-2xl border border-white/20 glass">
                  <h3 className="text-lg font-semibold mb-2 text-neon">Widget 3</h3>
                  <p className="text-sm text-gray-300">You can add more components here.</p>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'system' && (
            <motion.div
              key="system"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SystemPage onBack={() => setView('dashboard')} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
