import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export function useAuthRedirect(requiredRole?: string) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return // Attendre le chargement

    // Vérifier si l'utilisateur est connecté
    if (status === 'unauthenticated' || !session) {
      router.push('/login')
      return
    }

    // Vérifier le rôle si spécifié
    if (requiredRole) {
      const user = session?.user as any
      if (!user?.roles?.includes(requiredRole)) {
        router.push('/login')
        return
      }
    }

    // Vérifier l'expiration du token
    if (session?.expires) {
      const now = new Date()
      const expirationDate = new Date(session.expires)
      
      if (now >= expirationDate) {
        // Token expiré, rediriger vers login
        router.push('/login')
        return
      }
    }
  }, [session, status, router, requiredRole])

  return {
    session,
    status,
    isLoading: status === 'loading',
    isAuthenticated: status === 'authenticated' && !!session,
  }
}
