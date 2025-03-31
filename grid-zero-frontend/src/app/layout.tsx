'use client'

import './globals.css'
import TopMenuBar from '@/components/TopMenuBar'
import WelcomeStatus from '@/components/WelcomeStatus'
import GridBackground from '@/components/GridBackground'
import { usePathname } from 'next/navigation'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // 🧠 Map routes to page titles
  const getPageTitle = (path: string) => {
    switch (path) {
      case '/':
        return 'Dashboard'
      case '/system':
        return 'System Monitor'
      case '/camera':
        return 'Camera Feed'
      case '/network':
        return 'Network'
      case '/files':
        return 'Files'
      case '/settings':
        return 'Settings'
      default:
        return 'GridZero'
    }
  }

  const pageTitle = getPageTitle(pathname)

  return (
    <html lang="en">
      <body className="relative h-screen text-white bg-[#0a0a0a] font-mono overflow-hidden">
        {/* ✅ Grid Background */}
        <GridBackground />

        {/* ✅ Static Top */}
        <TopMenuBar title={pageTitle} />
        <WelcomeStatus />

        {/* ✅ Page Content */}
        <main className="pt-20 px-6 h-full overflow-y-auto relative z-10">
          {children}
        </main>
      </body>
    </html>
  )
}
