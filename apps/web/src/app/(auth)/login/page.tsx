'use client'

import { useState, Suspense, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Shield } from 'lucide-react'
import { LoginDemoChips } from '@/components/ui/LoginDemoChips'

const loginSchema = z.object({
  email: z.string().email('Adresse email invalide'),
  password: z.string().min(1, 'Le mot de passe est requis')
})

type LoginForm = z.infer<typeof loginSchema>

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session, status, update } = useSession()
  const next = searchParams?.get('next') || '/admin'

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loginSuccess, setLoginSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema)
  })

  // Rediriger vers /admin une fois la session disponible après connexion réussie
  useEffect(() => {
    if (loginSuccess) {
      if (status === 'authenticated' && session) {
        // Vérifier que l'utilisateur a le rôle ADMIN
        const user = session.user as any
        if (user?.roles?.includes('ADMIN')) {
          // Rafraîchir le router pour mettre à jour les données côté serveur
          router.refresh()
          // Utiliser window.location pour forcer un rechargement complet et garantir la session
          setTimeout(() => {
            window.location.href = next
          }, 100)
        } else {
          setError("Vous n'avez pas les permissions nécessaires pour accéder à cette page.")
          setLoginSuccess(false)
          setIsLoading(false)
        }
      } else if (status === 'unauthenticated') {
        // Si après 2 secondes la session n'est toujours pas disponible, forcer la redirection
        const timeout = setTimeout(() => {
          console.warn('Session not available after login, forcing redirect...')
          window.location.href = next
        }, 2000)
        
        return () => clearTimeout(timeout)
      }
    }
  }, [loginSuccess, status, session, router, next])

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true)
    setError(null)
    setLoginSuccess(false)

    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: next
      })

      console.log('Login result:', result)

      if (result?.error) {
        // Améliorer le message d'erreur selon le type
        if (result.error === 'CredentialsSignin') {
          setError('Impossible de se connecter. Vérifiez que l\'API backend est démarrée et que vos identifiants sont corrects.')
        } else {
          setError('Identifiants invalides ou erreur de connexion')
        }
        setIsLoading(false)
      } else if (result?.ok) {
        // Marquer la connexion comme réussie
        setLoginSuccess(true)
        // Mettre à jour la session immédiatement
        await update()
        // Attendre un court instant pour que la session soit mise à jour
        await new Promise(resolve => setTimeout(resolve, 300))
        // Le useEffect se chargera de la redirection
      } else {
        // Si result n'a pas ok ni error, essayer quand même de rediriger
        console.warn('Unexpected login result:', result)
        setLoginSuccess(true)
        await update()
        await new Promise(resolve => setTimeout(resolve, 300))
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('Une erreur est survenue. Veuillez réessayer.')
      setIsLoading(false)
    }
  }

  const handleDemoLogin = (email: string, password: string) => {
    setValue('email', email)
    setValue('password', password)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center mb-4">
          <Shield className="h-12 w-12 text-blue-600" />
        </div>
        <CardTitle className="text-2xl text-center">Connexion Admin</CardTitle>
        <CardDescription className="text-center">
          Entrez vos identifiants pour accéder au panneau d'administration
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginDemoChips onSelect={handleDemoLogin} />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@aspc-ci.org"
              {...register('email')}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              placeholder="Entrez votre mot de passe"
              {...register('password')}
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full cursor-pointer" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Se connecter
          </Button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          <p>
            Compte verrouillé ? Contactez le support pour obtenir de l'aide.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          </CardContent>
        </Card>
      }>
        <LoginForm />
      </Suspense>
    </div>
  )
}
