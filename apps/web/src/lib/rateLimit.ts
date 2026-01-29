// Simple in-memory rate limiter for login attempts
// In production, use Redis or similar

interface RateLimitEntry {
  count: number
  resetTime: number
}

const rateLimitMap = new Map<string, RateLimitEntry>()
const WINDOW_MS = 15 * 60 * 1000 // 15 minutes
const MAX_ATTEMPTS = 5

export function checkRateLimit(identifier: string): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now()
  const entry = rateLimitMap.get(identifier)

  if (!entry || now > entry.resetTime) {
    // Reset or new entry
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + WINDOW_MS
    })
    return { allowed: true, remaining: MAX_ATTEMPTS - 1, resetTime: now + WINDOW_MS }
  }

  if (entry.count >= MAX_ATTEMPTS) {
    return { allowed: false, remaining: 0, resetTime: entry.resetTime }
  }

  entry.count++
  return { allowed: true, remaining: MAX_ATTEMPTS - entry.count, resetTime: entry.resetTime }
}

export function getLoginRateLimit(email: string, ip: string): { allowed: boolean; remaining: number; resetTime: number } {
  // Check by email
  const emailLimit = checkRateLimit(`email:${email}`)
  if (!emailLimit.allowed) {
    return emailLimit
  }

  // Check by IP
  const ipLimit = checkRateLimit(`ip:${ip}`)
  if (!ipLimit.allowed) {
    return ipLimit
  }

  // Return the more restrictive limit
  return emailLimit.remaining <= ipLimit.remaining ? emailLimit : ipLimit
}