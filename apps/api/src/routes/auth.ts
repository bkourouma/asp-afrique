import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import bcrypt from 'bcryptjs'
import { prisma } from '@packages/db'

interface LoginRequest {
  email: string
  password: string
}

interface LoginResponse {
  accessToken: string
  user: {
    id: string
    email: string
    name: string | null
    roles: string[]
  }
}

export default async function authRoutes(fastify: FastifyInstance) {
  // Login endpoint
  fastify.post<{ Body: LoginRequest; Reply: LoginResponse }>(
    '/login',
    async (request: FastifyRequest<{ Body: LoginRequest }>, reply: FastifyReply) => {
      try {
        const { email, password } = request.body

        if (!email || !password) {
          return reply.status(400).send({
            error: 'Email and password are required'
          })
        }

        // Find user
        const user = await prisma.user.findUnique({
          where: { email },
          include: {
            roles: {
              include: {
                role: true
              }
            }
          }
        })

        if (!user) {
          return reply.status(401).send({
            error: 'Invalid credentials'
          })
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash)
        if (!isPasswordValid) {
          return reply.status(401).send({
            error: 'Invalid credentials'
          })
        }

        // Update last login
        await prisma.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() }
        })

        // Generate JWT token
        const token = fastify.jwt.sign(
          {
            sub: user.id,
            email: user.email,
            roles: user.roles.map((ur: { role: { key: string } }) => ur.role.key)
          },
          { expiresIn: '15m' }
        )

        return reply.send({
          accessToken: token,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            roles: user.roles.map((ur: { role: { key: string } }) => ur.role.key)
          }
        })
      } catch (error) {
        fastify.log.error(error)
        return reply.status(500).send({
          error: 'Internal server error'
        })
      }
    }
  )

  // Logout endpoint
  fastify.post('/logout', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // In a real app, you might want to invalidate tokens here
      // For now, just return success
      return reply.send({ success: true })
    } catch (error) {
      fastify.log.error(error)
      return reply.status(500).send({
        error: 'Internal server error'
      })
    }
  })

  // Verify token endpoint
  fastify.get('/verify', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify()
      return reply.send({ valid: true })
    } catch (error) {
      return reply.status(401).send({
        error: 'Invalid token'
      })
    }
  })
}

