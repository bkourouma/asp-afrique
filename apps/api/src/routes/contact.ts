import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import emailService from '../services/emailService.js'
import { ContactFormData, validateContactForm, createContactModel } from '../models/contactModel.js'

interface ContactRequest extends ContactFormData {}

export default async function contactRoutes(fastify: FastifyInstance) {
  // Test SMTP connection
  fastify.get('/test-email', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const isConnected = await emailService.testConnection()
      if (isConnected) {
        return reply.send({ 
          success: true, 
          message: 'Connexion SMTP réussie' 
        })
      } else {
        return reply.status(500).send({ 
          success: false, 
          message: 'Échec de la connexion SMTP' 
        })
      }
    } catch (error) {
      fastify.log.error(error)
      return reply.status(500).send({ 
        success: false, 
        message: 'Erreur lors du test SMTP' 
      })
    }
  })

  // Submit contact form
  fastify.post<{ Body: ContactRequest }>(
    '/',
    async (request: FastifyRequest<{ Body: ContactRequest }>, reply: FastifyReply) => {
      try {
        fastify.log.info(`Données reçues: ${JSON.stringify(request.body)}`)
        
        const contactModel = createContactModel(request.body)
        const validation = contactModel.getValidatedData()

        if (!validation.success) {
          fastify.log.error(`Erreurs de validation: ${JSON.stringify(validation.errors)}`)
          return reply.status(400).send({
            success: false,
            message: 'Données de contact invalides',
            errors: validation.errors?.reduce((acc, error) => {
              acc[error.field] = [error.message]
              return acc
            }, {} as Record<string, string[]>)
          })
        }

        const { consultingService, name, email, phone, message } = validation.data!

        // Send email notification
        try {
          await emailService.sendContactEmail({
            consultingService,
            name,
            email,
            phone,
            message
          })
          fastify.log.info('Email de contact envoyé avec succès')
        } catch (emailError) {
          fastify.log.error(emailError)
          return reply.status(500).send({
            success: false,
            message: 'Erreur lors de l\'envoi de l\'email'
          })
        }

        return reply.status(200).send({
          success: true,
          message: 'Message envoyé avec succès'
        })
      } catch (error) {
        fastify.log.error(error)
        return reply.status(500).send({
          error: 'Internal server error'
        })
      }
    }
  )
}