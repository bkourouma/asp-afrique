import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '@packages/db'

interface ConsultingServiceResponse {
  id: string
  name: string
  slug: string
  description: string
  entity: string
  targetSectors?: string | null
  ctaText?: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export default async function consultingRoutes(fastify: FastifyInstance) {
  // Get all consulting services
  fastify.get(
    '/',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const services = await prisma.consultingService.findMany({
          where: { isActive: true },
          orderBy: { createdAt: 'asc' }
        })

        return reply.send(services)
      } catch (error) {
        fastify.log.error(error)
        return reply.status(500).send({
          error: 'Internal server error'
        })
      }
    }
  )

  // Get consulting service by ID
  fastify.get<{ Params: { id: string } }>(
    '/:id',
    async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      try {
        const { id } = request.params

        const service = await prisma.consultingService.findUnique({
          where: { id, isActive: true }
        })

        if (!service) {
          return reply.status(404).send({
            error: 'Consulting service not found'
          })
        }

        return reply.send(service)
      } catch (error) {
        fastify.log.error(error)
        return reply.status(500).send({
          error: 'Internal server error'
        })
      }
    }
  )

  // Get consulting service by slug
  fastify.get<{ Params: { slug: string } }>(
    '/slug/:slug',
    async (request: FastifyRequest<{ Params: { slug: string } }>, reply: FastifyReply) => {
      try {
        const { slug } = request.params

        const service = await prisma.consultingService.findUnique({
          where: { slug, isActive: true }
        })

        if (!service) {
          return reply.status(404).send({
            error: 'Consulting service not found'
          })
        }

        return reply.send(service)
      } catch (error) {
        fastify.log.error(error)
        return reply.status(500).send({
          error: 'Internal server error'
        })
      }
    }
  )

  // Create consulting service
  fastify.post(
    '/',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {

        const serviceData = request.body as any

        // Validate required fields
        if (!serviceData.name || !serviceData.slug || !serviceData.description || !serviceData.entity) {
          return reply.status(400).send({
            error: 'Missing required fields: name, slug, description, entity'
          })
        }

        const service = await prisma.consultingService.create({
          data: {
            name: serviceData.name,
            slug: serviceData.slug,
            description: serviceData.description,
            entity: serviceData.entity,
            targetSectors: serviceData.targetSectors,
            ctaText: serviceData.ctaText,
            isActive: serviceData.isActive ?? true
          }
        })

        return reply.status(201).send(service)
      } catch (error) {
        fastify.log.error(error)
        return reply.status(500).send({
          error: 'Internal server error'
        })
      }
    }
  )

  // Update consulting service
  fastify.put<{ Params: { id: string } }>(
    '/:id',
    async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      try {

        const { id } = request.params
        const updateData = request.body as Partial<ConsultingServiceResponse>

        const service = await prisma.consultingService.update({
          where: { id },
          data: {
            name: updateData.name,
            slug: updateData.slug,
            description: updateData.description,
            entity: updateData.entity,
            targetSectors: updateData.targetSectors,
            ctaText: updateData.ctaText,
            isActive: updateData.isActive
          }
        })

        return reply.send(service)
      } catch (error) {
        fastify.log.error(error)
        return reply.status(500).send({
          error: 'Internal server error'
        })
      }
    }
  )

  // Delete consulting service
  fastify.delete<{ Params: { id: string } }>(
    '/:id',
    async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      try {

        const { id } = request.params

        await prisma.consultingService.delete({
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