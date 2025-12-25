import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser, requireAuth } from '@/lib/auth/guards'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const user = requireAuth(getAuthenticatedUser(request))

    // Get full user data with roles
    const userData = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        roles: {
          include: {
            role: true
          }
        }
      }
    })

    if (!userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({
      id: userData.id,
      email: userData.email,
      name: userData.name,
      roles: userData.roles.map((ur: any) => ur.role.key),
      lastLoginAt: userData.lastLoginAt,
      createdAt: userData.createdAt
    })
  } catch (error) {
    console.error('Me endpoint error:', error)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}
