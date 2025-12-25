import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '@packages/db'

interface UserResponse {
  id: string
  email: string
  name: string | null
  roles: string[]
  createdAt: Date
  lastLoginAt: Date | null
}

export default async function userRoutes(fastify: FastifyInstance) {
  // Get current user
  fastify.get<{ Reply: UserResponse }>(
    '/me',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify()

        const user = await prisma.user.findUnique({
          where: { id: (request.user as any).sub },
          include: {
            roles: {
              include: {
                role: true
              }
            }
          }
        })

        if (!user) {
          return reply.status(404).send({
            error: 'User not found'
          })
        }

        return reply.send({
          id: user.id,
          email: user.email,
          name: user.name,
          roles: user.roles.map((ur: { role: { key: string } }) => ur.role.key),
          createdAt: user.createdAt,
          lastLoginAt: user.lastLoginAt
        })
      } catch (error) {
        fastify.log.error(error)
        return reply.status(401).send({
          error: 'Unauthorized'
        })
      }
    }
  )

  // Get all users (admin only)
  fastify.get<{ Reply: UserResponse[] }>(
    '/',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify()

        // Check if user has admin role
        if (!(request.user as any).roles.includes('ADMIN')) {
          return reply.status(403).send({
            error: 'Forbidden'
          })
        }

        const users = await prisma.user.findMany({
          include: {
            roles: {
              include: {
                role: true
              }
            }
          }
        })

        return reply.send(
          users.map((user: typeof users[0]) => ({
            id: user.id,
            email: user.email,
            name: user.name,
            roles: user.roles.map((ur: { role: { key: string } }) => ur.role.key),
            createdAt: user.createdAt,
            lastLoginAt: user.lastLoginAt
          }))
        )
      } catch (error) {
        fastify.log.error(error)
        return reply.status(401).send({
          error: 'Unauthorized'
        })
      }
    }
  )

  // Get user by ID (admin only)
  fastify.get<{ Params: { id: string }; Reply: UserResponse }>(
    '/:id',
    async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      try {
        await request.jwtVerify()

        if (!(request.user as any).roles.includes('ADMIN')) {
          return reply.status(403).send({
            error: 'Forbidden'
          })
        }

        const user = await prisma.user.findUnique({
          where: { id: request.params.id },
          include: {
            roles: {
              include: {
                role: true
              }
            }
          }
        })

        if (!user) {
          return reply.status(404).send({
            error: 'User not found'
          })
        }

        return reply.send({
          id: user.id,
          email: user.email,
          name: user.name,
          roles: user.roles.map((ur: { role: { key: string } }) => ur.role.key),
          createdAt: user.createdAt,
          lastLoginAt: user.lastLoginAt
        })
      } catch (error) {
        fastify.log.error(error)
        return reply.status(401).send({
          error: 'Unauthorized'
        })
      }
    }
  )
}

