import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '@packages/db'

interface FormationResponse {
  id: string
  title: string
  slug: string
  duration: string
  description: string
  entity: string
  objectives?: string | null
  syllabus?: string | null
  imageUrl?: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export default async function formationRoutes(fastify: FastifyInstance) {
  // Get all formations
  fastify.get(
    '/',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const formations = await prisma.formation.findMany({
          where: { isActive: true },
          orderBy: { createdAt: 'asc' }
        })

        return reply.send(formations)
      } catch (error) {
        fastify.log.error(error)
        return reply.status(500).send({
          error: 'Internal server error'
        })
      }
    }
  )

  // Get formation by ID
  fastify.get<{ Params: { id: string } }>(
    '/:id',
    async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      try {
        const { id } = request.params

        const formation = await prisma.formation.findUnique({
          where: { id, isActive: true }
        })

        if (!formation) {
          return reply.status(404).send({
            error: 'Formation not found'
          })
        }

        return reply.send(formation)
      } catch (error) {
        fastify.log.error(error)
        return reply.status(500).send({
          error: 'Internal server error'
        })
      }
    }
  )

  // Get formation by slug
  fastify.get<{ Params: { slug: string } }>(
    '/slug/:slug',
    async (request: FastifyRequest<{ Params: { slug: string } }>, reply: FastifyReply) => {
      try {
        const { slug } = request.params

        const formation = await prisma.formation.findUnique({
          where: { slug, isActive: true }
        })

        if (!formation) {
          return reply.status(404).send({
            error: 'Formation not found'
          })
        }

        return reply.send(formation)
      } catch (error) {
        fastify.log.error(error)
        return reply.status(500).send({
          error: 'Internal server error'
        })
      }
    }
  )

  // Create formation
  fastify.post(
    '/',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {

        const formationData = request.body as any

        // Validate required fields
        if (!formationData.title || !formationData.slug || !formationData.duration || !formationData.description || !formationData.entity) {
          return reply.status(400).send({
            error: 'Missing required fields: title, slug, duration, description, entity'
          })
        }

        const formation = await prisma.formation.create({
          data: {
            title: formationData.title,
            slug: formationData.slug,
            duration: formationData.duration,
            description: formationData.description,
            entity: formationData.entity,
            objectives: formationData.objectives,
            syllabus: formationData.syllabus,
            imageUrl: formationData.imageUrl,
            isActive: formationData.isActive ?? true
          }
        })

        return reply.status(201).send(formation)
      } catch (error) {
        fastify.log.error(error)
        return reply.status(500).send({
          error: 'Internal server error'
        })
      }
    }
  )

  // Update formation
  fastify.put<{ Params: { id: string } }>(
    '/:id',
    async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      try {

        const { id } = request.params
        const updateData = request.body as Partial<FormationResponse>

        // Validate required fields
        if (updateData.entity !== undefined && !updateData.entity) {
          return reply.status(400).send({
            error: 'Entity is required'
          })
        }

        const formation = await prisma.formation.update({
          where: { id },
          data: {
            title: updateData.title,
            slug: updateData.slug,
            duration: updateData.duration,
            description: updateData.description,
            entity: updateData.entity,
            objectives: updateData.objectives,
            syllabus: updateData.syllabus,
            imageUrl: updateData.imageUrl,
            isActive: updateData.isActive
          }
        })

        return reply.send(formation)
      } catch (error) {
        fastify.log.error(error)
        return reply.status(500).send({
          error: 'Internal server error'
        })
      }
    }
  )

  // Delete formation
  fastify.delete<{ Params: { id: string } }>(
    '/:id',
    async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      try {

        const { id } = request.params

        await prisma.formation.delete({
          where: { id }
        })

        return reply.send({ success: true })
      } catch (error) {
        fastify.log.error(error)
        return reply.status(500).send({
          error: 'Internal server error'
        })
      }
    }
  )
}