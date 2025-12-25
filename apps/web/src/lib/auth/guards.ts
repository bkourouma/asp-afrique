import { NextRequest } from 'next/server'
import { verifyAccessToken, JWTPayload } from './jwt'

export interface AuthenticatedUser {
  id: string
  roles: string[]
}

export function getAuthenticatedUser(req: NextRequest): AuthenticatedUser | null {
  const authHeader = req.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return null
  }

  const token = authHeader.substring(7)
  const payload = verifyAccessToken(token)

  if (!payload) {
    return null
  }

  return {
    id: payload.sub,
    roles: payload.roles
  }
}

export function requireAuth(user: AuthenticatedUser | null): AuthenticatedUser {
  if (!user) {
    throw new Error('Authentication required')
  }
  return user
}

export function requireRole(user: AuthenticatedUser, role: string): AuthenticatedUser {
  if (!user.roles.includes(role)) {
    throw new Error(`Role '${role}' required`)
  }
  return user
}

export function requireAdmin(user: AuthenticatedUser | null): AuthenticatedUser {
  const authenticatedUser = requireAuth(user)
  return requireRole(authenticatedUser, 'ADMIN')
}