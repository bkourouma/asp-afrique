import { NextRequest, NextResponse } from 'next/server'
import { revokeRefreshTokens, verifyRefreshToken } from '@/lib/auth/jwt'
import { logAuditEvent } from '@/lib/audit'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const refreshToken = cookieStore.get('refresh-token')?.value

    let userId: string | undefined

    if (refreshToken) {
      // Get user ID from token for audit logging
      const payload = verifyRefreshToken(refreshToken)
      userId = payload?.sub
    }

    // Revoke all refresh tokens for the user
    if (userId) {
      await revokeRefreshTokens(userId)
    }

    // Clear refresh token cookie
    const response = NextResponse.json({ success: true })

    response.cookies.set('refresh-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/'
    })

    // Get IP from headers
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0].trim() : request.headers.get('x-real-ip') || 'unknown'

    await logAuditEvent({
      userId,
      action: 'LOGOUT',
      ip: ip,
      userAgent: request.headers.get('user-agent') || '',
      metadata: { success: true }
    })

    return response
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}