import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import bcrypt from 'bcryptjs'
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

  // Create user (admin only)
  fastify.post(
    '/',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify()

        if (!(request.user as any).roles.includes('ADMIN')) {
          return reply.status(403).send({
            error: 'Forbidden'
          })
        }

        const userData = request.body as any

        // Validate required fields
        if (!userData.email || !userData.password) {
          return reply.status(400).send({
            error: 'Email and password are required'
          })
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
          where: { email: userData.email }
        })

        if (existingUser) {
          return reply.status(400).send({
            error: 'User with this email already exists'
          })
        }

        // Hash password
        const passwordHash = await bcrypt.hash(userData.password, 12)

        // Get or create ADMIN role
        let adminRole = await prisma.role.findUnique({
          where: { key: 'ADMIN' }
        })

        if (!adminRole) {
          adminRole = await prisma.role.create({
            data: {
              key: 'ADMIN',
              label: 'Administrator'
            }
          })
        }

        // Create user
        const user = await prisma.user.create({
          data: {
            email: userData.email,
            passwordHash,
            name: userData.name || null,
            isActive: userData.isActive !== undefined ? userData.isActive : true
          }
        })

        // Assign ADMIN role
        await prisma.userRole.create({
          data: {
            userId: user.id,
            roleId: adminRole.id
          }
        })

        // Fetch user with roles
        const userWithRoles = await prisma.user.findUnique({
          where: { id: user.id },
          include: {
            roles: {
              include: {
                role: true
              }
            }
          }
        })

        return reply.status(201).send({
          id: userWithRoles!.id,
          email: userWithRoles!.email,
          name: userWithRoles!.name,
          roles: userWithRoles!.roles.map((ur: { role: { key: string } }) => ur.role.key),
          createdAt: userWithRoles!.createdAt,
          lastLoginAt: userWithRoles!.lastLoginAt
        })
      } catch (error: any) {
        fastify.log.error('Error creating user:', error)
        // Return more detailed error in development
        const errorMessage = process.env.NODE_ENV === 'development' 
          ? (error?.message || 'Internal server error')
          : 'Internal server error'
        return reply.status(500).send({
          error: errorMessage,
          details: process.env.NODE_ENV === 'development' ? error?.stack : undefined
        })
      }
    }
  )

  // Update user (admin only)
  fastify.put<{ Params: { id: string } }>(
    '/:id',
    async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      try {
        await request.jwtVerify()

        if (!(request.user as any).roles.includes('ADMIN')) {
          return reply.status(403).send({
            error: 'Forbidden'
          })
        }

        const { id } = request.params
        const updateData = request.body as any

        // If password is provided, hash it
        if (updateData.password) {
          updateData.passwordHash = await bcrypt.hash(updateData.password, 12)
          delete updateData.password
        }

        // Prepare update data
        const dataToUpdate: any = {}
        if (updateData.name !== undefined) dataToUpdate.name = updateData.name
        if (updateData.email !== undefined) dataToUpdate.email = updateData.email
        if (updateData.passwordHash !== undefined) dataToUpdate.passwordHash = updateData.passwordHash
        if (updateData.isActive !== undefined) dataToUpdate.isActive = updateData.isActive

        const user = await prisma.user.update({
          where: { id },
          data: dataToUpdate,
          include: {
            roles: {
              include: {
                role: true
              }
            }
          }
        })

        return reply.send({
          id: user.id,
          email: user.email,
          name: user.name,
          roles: user.roles.map((ur: { role: { key: string } }) => ur.role.key),
          createdAt: user.createdAt,
          lastLoginAt: user.lastLoginAt
        })
      } catch (error: any) {
        fastify.log.error('Error creating user:', error)
        // Return more detailed error in development
        const errorMessage = process.env.NODE_ENV === 'development' 
          ? (error?.message || 'Internal server error')
          : 'Internal server error'
        return reply.status(500).send({
          error: errorMessage,
          details: process.env.NODE_ENV === 'development' ? error?.stack : undefined
        })
      }
    }
  )

  // Delete user (admin only)
  fastify.delete<{ Params: { id: string } }>(
    '/:id',
    async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      try {
        await request.jwtVerify()

        if (!(request.user as any).roles.includes('ADMIN')) {
          return reply.status(403).send({
            error: 'Forbidden'
          })
        }

        const { id } = request.params

        await prisma.user.delete({
          where: { id }
        })

        return reply.send({ success: true })
      } catch (error: any) {
        fastify.log.error('Error creating user:', error)
        // Return more detailed error in development
        const errorMessage = process.env.NODE_ENV === 'development' 
          ? (error?.message || 'Internal server error')
          : 'Internal server error'
        return reply.status(500).send({
          error: errorMessage,
          details: process.env.NODE_ENV === 'development' ? error?.stack : undefined
        })
      }
    }
  )
}

