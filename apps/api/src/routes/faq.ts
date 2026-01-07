import { FastifyPluginAsync } from 'fastify';
import { prisma } from '@packages/db';

const faqRoutes: FastifyPluginAsync = async (fastify) => {
  // GET /api/v1/faq - Récupérer toutes les FAQs (publiées ou toutes pour admin)
  fastify.get('/', async (request, reply) => {
    try {
      const { status, category } = request.query as any;
      
      const where: any = {};

      // Si status='all', montrer toutes les FAQs (pour l'admin)
      // Si status='published' ou autre, filtrer par ce statut
      // Sinon (par défaut), ne montrer que les FAQs publiées (pour le public)
      if (status && status !== 'all') {
        where.status = status;
      } else if (!status) {
        where.status = 'Publié';
      }
      
      if (category) {
        where.category = category;
      }
      
      const faqs = await prisma.faq.findMany({
        where,
        orderBy: {
          createdAt: 'desc',
        },
      });
      
      return faqs;
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Failed to fetch FAQs' });
    }
  });

  // GET /api/v1/faq/:id - Récupérer une FAQ par ID
  fastify.get('/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      
      const faq = await prisma.faq.findUnique({
        where: { id },
      });
      
      if (!faq) {
        return reply.status(404).send({ error: 'FAQ not found' });
      }
      
      return faq;
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Failed to fetch FAQ' });
    }
  });

  // POST /api/v1/faq - Créer une nouvelle FAQ
  fastify.post('/', async (request, reply) => {
    try {
      const {
        question,
        answer,
        category,
        status,
      } = request.body as any;
      
      // Validation
      if (!question || !answer || !category) {
        return reply.status(400).send({ 
          error: 'Missing required fields: question, answer, category' 
        });
      }
      
      const faq = await prisma.faq.create({
        data: {
          question,
          answer,
          category,
          status: status || 'draft',
        },
      });
      
      return reply.status(201).send(faq);
    } catch (error: any) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Failed to create FAQ' });
    }
  });

  // PUT /api/v1/faq/:id - Mettre à jour une FAQ
  fastify.put('/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const {
        question,
        answer,
        category,
        status,
      } = request.body as any;
      
      // Vérifier que la FAQ existe
      const existingFAQ = await prisma.faq.findUnique({
        where: { id },
      });
      
      if (!existingFAQ) {
        return reply.status(404).send({ error: 'FAQ not found' });
      }
      
      const updateData: any = {};
      
      if (question !== undefined) updateData.question = question;
      if (answer !== undefined) updateData.answer = answer;
      if (category !== undefined) updateData.category = category;
      if (status !== undefined) updateData.status = status;
      
      const faq = await prisma.faq.update({
        where: { id },
        data: updateData,
      });
      
      return faq;
    } catch (error: any) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Failed to update FAQ' });
    }
  });

  // DELETE /api/v1/faq/:id - Supprimer une FAQ
  fastify.delete('/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      
      await prisma.faq.delete({
        where: { id },
      });
      
      return { message: 'FAQ deleted successfully' };
    } catch (error: any) {
      fastify.log.error(error);
      
      if (error.code === 'P2025') {
        return reply.status(404).send({ error: 'FAQ not found' });
      }
      
      reply.status(500).send({ error: 'Failed to delete FAQ' });
    }
  });
};

export default faqRoutes;

