import { NextRequest, NextResponse } from 'next/server'
import { verifyRefreshToken, validateRefreshToken, rotateRefreshToken, signAccessToken, signRefreshToken } from '@/lib/auth/jwt'
import { logAuditEvent } from '@/lib/audit'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const refreshToken = cookieStore.get('refresh-token')?.value

    if (!refreshToken) {
      return NextResponse.json({ error: 'No refresh token' }, { status: 401 })
    }

    // Get user ID from refresh token payload - use verifyRefreshToken to get payload
    const payload = verifyRefreshToken(refreshToken)
    if (!payload) {
      return NextResponse.json({ error: 'Invalid refresh token' }, { status: 401 })
    }

    // Validate against database
    const isValid = await validateRefreshToken(refreshToken, payload.sub)
    
    // Get IP from headers
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0].trim() : request.headers.get('x-real-ip') || 'unknown'
    
    if (!isValid) {
      await logAuditEvent({
        userId: payload.sub,
        action: 'REFRESH',
        ip: ip,
        userAgent: request.headers.get('user-agent') || '',
        metadata: { success: false, reason: 'invalid_token' }
      })
      return NextResponse.json({ error: 'Invalid refresh token' }, { status: 401 })
    }

    // Rotate refresh token
    const newRefreshToken = signRefreshToken({
      sub: payload.sub,
      roles: payload.roles
    })

    const newRefreshTokenId = await rotateRefreshToken('', payload.sub, newRefreshToken)

    // Sign new access token
    const newAccessToken = signAccessToken({
      sub: payload.sub,
      roles: payload.roles
    })

    // Set new refresh token cookie
    const response = NextResponse.json({
      accessToken: newAccessToken,
      expiresIn: 15 * 60 // 15 minutes
    })

    response.cookies.set('refresh-token', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      path: '/'
    })

    await logAuditEvent({
      userId: payload.sub,
      action: 'REFRESH',
      ip: ip,
      userAgent: request.headers.get('user-agent') || '',
      metadata: { success: true }
    })

    return response
  } catch (error) {
    console.error('Refresh error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}