'use client'

import { memo, useCallback, useMemo } from 'react'
import { usePathname } from 'next/navigation'
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
  Play,
  UserPlus
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Navigation items with icon components pre-defined
const NAVIGATION_ITEMS = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Blog', href: '/admin/blog', icon: FileText },
  { name: 'Vidéos', href: '/admin/videos', icon: Play },
  { name: 'Formations', href: '/admin/formations', icon: Users },
  { name: 'Consulting', href: '/admin/consulting', icon: Briefcase },
  { name: 'Utilisateurs', href: '/admin/users', icon: UserPlus },
] as const

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

interface NavigationItemProps {
  item: {
    name: string
    href: string
    icon: React.ComponentType<{ className?: string }>
  }
  isActive: boolean
  onNavigate: () => void
}

// Memoized navigation item to prevent unnecessary re-renders
const NavigationItem = memo(({ item, isActive, onNavigate }: NavigationItemProps) => {
  const Icon = item.icon
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        'flex items-center px-4 py-3 text-base font-medium rounded-md transition-colors duration-150',
        isActive
          ? 'bg-blue-100 text-blue-700'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      <Icon className="mr-3 h-6 w-6 flex-shrink-0" />
      <span className="truncate">{item.name}</span>
    </Link>
  )
}, (prevProps, nextProps) => {
  // Custom comparison for memo - only re-render if these change
  return (
    prevProps.isActive === nextProps.isActive &&
    prevProps.item.href === nextProps.item.href &&
    prevProps.onNavigate === nextProps.onNavigate
  )
})

NavigationItem.displayName = 'NavigationItem'

export const OptimizedSidebar = memo(({ isOpen, onToggle }: SidebarProps) => {
  const pathname = usePathname()

  const handleLogout = useCallback(() => {
    signOut({ callbackUrl: '/login' })
  }, [])

  // Memoize the navigate handler to prevent unnecessary re-renders of children
  const handleNavigate = useCallback(() => {
    // Close sidebar on mobile after navigation
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      onToggle()
    }
  }, [onToggle])

  // Memoize navigation items to avoid recalculating on every render
  const navigationItems = useMemo(() => {
    return NAVIGATION_ITEMS.map((item) => ({
      ...item,
      isActive: pathname === item.href
    }))
  }, [pathname])

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

          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigationItems.map((item) => (
              <NavigationItem
                key={item.href}
                item={item}
                isActive={item.isActive}
                onNavigate={handleNavigate}
              />
            ))}
          </nav>

          <div className="p-4 border-t flex-shrink-0">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-base font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150"
            >
              <LogOut className="mr-3 h-6 w-6 flex-shrink-0" />
              <span className="truncate">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}, (prevProps, nextProps) => {
  // Custom comparison for memo - only re-render if these change
  return (
    prevProps.isOpen === nextProps.isOpen &&
    prevProps.onToggle === nextProps.onToggle
  )
})

OptimizedSidebar.displayName = 'OptimizedSidebar'
