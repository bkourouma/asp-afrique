'use client'

import { useState, useEffect, memo, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { OptimizedSidebar } from '../../components/admin/OptimizedSidebar'

export const AdminLayoutClient = memo(({
  children,
}: {
  children: React.ReactNode
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { data: session, status } = useSession()
  const router = useRouter()

  // Memoize the toggle handler to prevent unnecessary re-renders
  const handleToggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev)
  }, [])

  // Vérifier l'expiration du token et rediriger si nécessaire
  useEffect(() => {
    if (status === 'loading') return // Attendre le chargement

    if (status === 'unauthenticated' || !session) {
      router.push('/login')
      return
    }

    // Vérifier si l'utilisateur a le rôle ADMIN
    const user = session?.user as any
    if (!user?.roles?.includes('ADMIN')) {
      router.push('/login')
      return
    }

    // Vérifier l'expiration du token (si disponible)
    if (session?.expires) {
      const now = new Date()
      const expirationDate = new Date(session.expires)

      if (now >= expirationDate) {
        // Token expiré, rediriger vers login
        router.push('/login')
        return
      }
    }
  }, [session, status, router])

  // Afficher un loading pendant la vérification
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100 admin-interface overflow-hidden">
      <OptimizedSidebar isOpen={sidebarOpen} onToggle={handleToggleSidebar} />
      <main className="flex-1 flex flex-col lg:ml-0 overflow-hidden">
        {/* Espace pour le bouton hamburger sur mobile */}
        <div className="lg:hidden h-16 flex-shrink-0"></div>
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}, (prevProps, nextProps) => {
  // Custom comparison for memo - only re-render if children change
  return prevProps.children === nextProps.children
})

AdminLayoutClient.displayName = 'AdminLayoutClient'