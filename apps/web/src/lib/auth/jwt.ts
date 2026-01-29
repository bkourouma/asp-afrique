import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

const JWT_ACCESS_SECRET = process.env.NEXTAUTH_SECRET!
const JWT_REFRESH_SECRET = process.env.NEXTAUTH_SECRET! + '_refresh'
const JWT_AUDIENCE = process.env.JWT_AUDIENCE || 'aspc-ci-web'
const JWT_ISSUER = process.env.JWT_ISSUER || 'aspc-ci'

export interface JWTPayload {
  sub: string
  roles: string[]
  iat?: number
  exp?: number
  aud?: string
  iss?: string
}

export function signAccessToken(payload: Omit<JWTPayload, 'iat' | 'exp' | 'aud' | 'iss'>): string {
  return jwt.sign(
    {
      ...payload,
      aud: JWT_AUDIENCE,
      iss: JWT_ISSUER
    },
    JWT_ACCESS_SECRET,
    {
      expiresIn: '15m',
      algorithm: 'HS256'
    }
  )
}

export function signRefreshToken(payload: Omit<JWTPayload, 'iat' | 'exp' | 'aud' | 'iss'>): string {
  return jwt.sign(
    {
      ...payload,
      aud: JWT_AUDIENCE,
      iss: JWT_ISSUER
    },
    JWT_REFRESH_SECRET,
    {
      expiresIn: '30d',
      algorithm: 'HS256'
    }
  )
}

export function verifyAccessToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_ACCESS_SECRET, {
      audience: JWT_AUDIENCE,
      issuer: JWT_ISSUER
    }) as JWTPayload
  } catch {
    return null
  }
}

export function verifyRefreshToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET, {
      audience: JWT_AUDIENCE,
      issuer: JWT_ISSUER
    }) as JWTPayload
  } catch {
    return null
  }
}

export async function storeRefreshToken(userId: string, token: string): Promise<string> {
  const tokenHash = await bcrypt.hash(token, 12)
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days

  const refreshToken = await prisma.refreshToken.create({
    data: {
      userId,
      tokenHash,
      expiresAt
    }
  })

  return refreshToken.id
}

export async function validateRefreshToken(token: string, userId: string): Promise<boolean> {
  const refreshTokens = await prisma.refreshToken.findMany({
    where: {
      userId,
      revokedAt: null,
      expiresAt: {
        gt: new Date()
      }
    }
  })

  for (const rt of refreshTokens) {
    const isValid = await bcrypt.compare(token, rt.tokenHash)
    if (isValid) {
      return true
    }
  }

  return false
}

export async function rotateRefreshToken(oldTokenId: string, userId: string, newToken: string): Promise<string> {
  const tokenHash = await bcrypt.hash(newToken, 12)
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days

  const newRefreshToken = await prisma.refreshToken.create({
    data: {
      userId,
      tokenHash,
      expiresAt,
      rotatedFromId: oldTokenId
    }
  })

  // Revoke the old token
  await prisma.refreshToken.update({
    where: { id: oldTokenId },
    data: { revokedAt: new Date() }
  })

  return newRefreshToken.id
}

export async function revokeRefreshTokens(userId: string): Promise<void> {
  await prisma.refreshToken.updateMany({
    where: {
      userId,
      revokedAt: null
    },
    data: {
      revokedAt: new Date()
    }
  })
}