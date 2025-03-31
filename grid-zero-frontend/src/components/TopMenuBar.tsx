'use client'

import { useState } from 'react'
import {
  FiMonitor,
  FiCamera,
  FiWifi,
  FiFolder,
  FiSettings,
} from 'react-icons/fi'
import { AnimatePresence, motion } from 'framer-motion'

type Props = {
  title?: string
}

const menuItems = [
  { icon: <FiMonitor />, label: 'System Monitor' },
  { icon: <FiCamera />, label: 'Camera Feed' },
  { icon: <FiWifi />, label: 'Network' },
  { icon: <FiFolder />, label: 'Files' },
  { icon: <FiSettings />, label: 'Settings' },
]

export default function TopMenuBar({ title = 'Dashboard' }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed top-2 left-0 w-full z-50 flex items-center h-20 px-4 pointer-events-none">
      {/* GZ. Button */}
      <div
        className="w-16 h-16 rounded-full bg-black flex items-center justify-center text-white 
                   text-xl font-square cursor-pointer shadow-green-glow border-2 border-[#00ff88] pointer-events-auto relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        GZ<span className="text-[#00ff88] animate-blink">.</span>

        {/* Absolutely Positioned Title */}
        <AnimatePresence mode="wait">
          {!isOpen && (
            <motion.div
              key="page-title"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute left-full top-1/2 -translate-y-1/2 ml-4 text-white/80 text-xl font-square pointer-events-none"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Menu Items */}
      <div className="flex items-center ml-4 space-x-4 pointer-events-auto">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`w-12 h-12 rounded-xl flex items-center justify-center text-white 
              transition-all duration-500 bg-black/70 border border-white/10
              ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 -translate-y-4'}`}
            style={{
              transitionDelay: `${index * 0.07}s`,
            }}
            title={item.label}
          >
            {item.icon}
          </div>
        ))}
      </div>
    </div>
  )
}
