'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import {
  LayoutDashboard,
  Users,
  Briefcase,
  LogOut,
  Menu,
  X,
  FileText,
  Play
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Blog', href: '/admin/blog', icon: FileText },
  { name: 'Vidéos', href: '/admin/videos', icon: Play },
  { name: 'Formations', href: '/admin/formations', icon: Users },
  { name: 'Consulting', href: '/admin/consulting', icon: Briefcase },
]

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  // Précharger toutes les routes de navigation au montage du composant
  useEffect(() => {
    navigation.forEach((item) => {
      router.prefetch(item.href)
    })
  }, [router])

  const handleLogout = () => {
    signOut({ callbackUrl: '/login' })
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={onToggle}
          className="p-3 rounded-lg bg-white shadow-xl text-gray-600 hover:text-gray-900 hover:bg-gray-50 border border-gray-200 transition-all duration-200"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 px-4 border-b">
            <h1 className="text-lg font-semibold text-gray-900">Admin</h1>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  prefetch={true}
                  onClick={() => {
                    // Close sidebar on mobile after navigation
                    if (window.innerWidth < 1024) {
                      onToggle()
                    }
                  }}
                  className={cn(
                    'flex items-center px-4 py-3 text-base font-medium rounded-md transition-colors',
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <item.icon className="mr-3 h-6 w-6" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-base font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <LogOut className="mr-3 h-6 w-6" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  )
}