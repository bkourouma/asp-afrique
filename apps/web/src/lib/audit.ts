import { prisma } from '@/lib/prisma'

export interface AuditEvent {
  userId?: string
  action: 'LOGIN' | 'LOGIN_FAIL' | 'REFRESH' | 'LOGOUT'
  ip?: string
  userAgent?: string
  metadata?: Record<string, any>
}

export async function logAuditEvent(event: AuditEvent): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        userId: event.userId,
        action: event.action,
        ip: event.ip,
        userAgent: event.userAgent,
        metadata: event.metadata
      }
    })
  } catch (error) {
    console.error('Failed to log audit event:', error)
    // Don't throw - audit logging shouldn't break the main flow
  }
}