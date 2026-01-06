import { NextAuthOptions, Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'

// Get API URL - server-side must use absolute URL (127.0.0.1)
// This function is called server-side by NextAuth, so it must always return an absolute URL
const getApiUrl = () => {
  // Server-side code: always use absolute 127.0.0.1 URL (avoid IPv6 ::1 issues)
  // NEXT_PUBLIC_API_URL is for client-side only - ignore it here
  // In production, use 127.0.0.1:3004 (Fastify API port)
  if (process.env.NODE_ENV === 'production') {
    return 'http://127.0.0.1:3004'; // Fastify API port - use IPv4 explicitly
  }
  // In development, use 127.0.0.1:3002
  return 'http://127.0.0.1:3002';
};

const API_URL = getApiUrl();

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-key-change-in-production-minimum-32-characters-long',
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // Call the backend API for authentication
          const response = await fetch(`${API_URL}/api/v1/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password
            })
          })

          if (!response.ok) {
            console.error('Auth failed:', response.statusText)
            return null
          }

          const data = await response.json()

          return {
            id: data.user.id,
            email: data.user.email,
            name: data.user.name,
            roles: data.user.roles,
            accessToken: data.accessToken
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        console.log('🔐 JWT Callback - User from API:', JSON.stringify(user))
        token.sub = user.id
        token.roles = user.roles
        token.accessToken = user.accessToken
        console.log('🔐 JWT Callback - Token roles:', token.roles)
      }
      return token
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token.sub && session.user) {
        console.log('📋 Session Callback - Token roles:', token.roles)
        ;(session.user as any).id = token.sub as string
        ;(session.user as any).roles = (token.roles as string[]) || []
        ;(session as any).accessToken = token.accessToken
        console.log('📋 Session Callback - Session user roles:', (session.user as any).roles)
      }
      return session
    }
  },
  pages: {
    signIn: '/login'
  }
}