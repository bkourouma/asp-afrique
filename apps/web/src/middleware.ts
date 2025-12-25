import { NextResponse } from 'next/server'

// Temporarily disable middleware for debugging
export default function middleware() {
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}