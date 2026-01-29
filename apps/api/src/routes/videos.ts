import { FastifyPluginAsync } from 'fastify';
import { prisma } from '@packages/db';

// Générer un slug à partir du titre
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

const videoRoutes: FastifyPluginAsync = async (fastify) => {
  // GET /api/v1/videos - Récupérer toutes les vidéos avec pagination et filtres
  fastify.get('/', async (request, reply) => {
    try {
      const {
        page = 1,
        limit = 12,
        status,
        category,
        type,
        search,
        sortBy = 'createdAt',
        sortOrder = 'desc'
      } = request.query as any;

      const skip = (Number(page) - 1) * Number(limit);
      const take = Number(limit);

      const where: any = {};

      // Filtres
      if (status) {
        where.status = status;
      }

      if (category) {
        where.category = category;
      }

      if (type) {
        where.type = type;
      }


      if (search) {
        where.OR = [
          { title: { contains: search as string, mode: 'insensitive' } },
          { description: { contains: search as string, mode: 'insensitive' } },
          { tags: { has: search as string } },
        ];
      }

      // Récupérer les vidéos avec pagination
      const [videos, total] = await Promise.all([
        prisma.video.findMany({
          where,
          skip,
          take,
          orderBy: {
            [sortBy]: sortOrder,
          },
        }),
        prisma.video.count({ where }),
      ]);

      return {
        data: videos,
        meta: {
          total,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(total / Number(limit)),
        },
      };
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Failed to fetch videos' });
    }
  });

  // GET /api/v1/videos/categories - Récupérer toutes les catégories de vidéos
  fastify.get('/categories', async (request, reply) => {
    try {
      const categories = await prisma.video.findMany({
        select: {
          category: true,
        },
        distinct: ['category'],
        where: {
          category: {
            not: null,
          },
        },
      });

      return categories.map((c: { category: string | null }) => c.category).filter(Boolean);
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Failed to fetch video categories' });
    }
  });

  // GET /api/v1/videos/by-slug/:slug - Récupérer une vidéo par slug
  fastify.get('/by-slug/:slug', async (request, reply) => {
    try {
      const { slug } = request.params as { slug: string };

      const video = await prisma.video.findUnique({
        where: { slug },
      });

      if (!video) {
        return reply.status(404).send({ error: 'Video not found' });
      }

      // Incrémenter le nombre de vues
      await prisma.video.update({
        where: { id: video.id },
        data: { views: { increment: 1 } },
      });

      return video;
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Failed to fetch video' });
    }
  });

  // GET /api/v1/videos/:id - Récupérer une vidéo par ID
  fastify.get('/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };

      const video = await prisma.video.findUnique({
        where: { id },
      });

      if (!video) {
        return reply.status(404).send({ error: 'Video not found' });
      }

      // Incrémenter le nombre de vues
      await prisma.video.update({
        where: { id },
        data: { views: { increment: 1 } },
      });

      return video;
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Failed to fetch video' });
    }
  });

  // POST /api/v1/videos - Créer une nouvelle vidéo
  fastify.post('/', async (request, reply) => {
    try {
      const {
        title,
        slug: customSlug,
        description,
        type = 'UPLOAD',
        videoUrl,
        videoId,
        videoFile,
        thumbnail,
        duration,
        durationSeconds,
        category,
        tags = [],
        author,
        status = 'DRAFT',
        subtitles,
        resources,
        publishedAt,
      } = request.body as any;

      // Validation
      if (!title) {
        return reply.status(400).send({
          error: 'Missing required field: title'
        });
      }

      // Générer le slug si non fourni
      const slug = customSlug || generateSlug(title);

      // Si publié, ajouter la date de publication
      const videoPublishedAt = status === 'PUBLISHED' && !publishedAt
        ? new Date()
        : publishedAt
        ? new Date(publishedAt)
        : null;

      const video = await prisma.video.create({
        data: {
          title,
          slug,
          description,
          type,
          videoUrl,
          videoId,
          videoFile,
          thumbnail,
          duration,
          durationSeconds,
          category,
          tags,
          author,
          status,
          subtitles,
          resources,
          publishedAt: videoPublishedAt,
        },
      });

      return reply.status(201).send(video);
    } catch (error: any) {
      fastify.log.error(error);

      if (error.code === 'P2002') {
        return reply.status(400).send({ error: 'A video with this slug already exists' });
      }

      reply.status(500).send({ error: 'Failed to create video' });
    }
  });

  // PUT /api/v1/videos/:id - Mettre à jour une vidéo
  fastify.put('/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const updateData = request.body as any;

      // Vérifier que la vidéo existe
      const existingVideo = await prisma.video.findUnique({
        where: { id },
      });

      if (!existingVideo) {
        return reply.status(404).send({ error: 'Video not found' });
      }

      // Si on passe en publié et qu'il n'y a pas de date de publication, l'ajouter
      if (updateData.status === 'PUBLISHED' && !existingVideo.publishedAt && !updateData.publishedAt) {
        updateData.publishedAt = new Date();
      }

      // Convertir publishedAt en Date si c'est une chaîne
      if (updateData.publishedAt && typeof updateData.publishedAt === 'string') {
        updateData.publishedAt = new Date(updateData.publishedAt);
      }

      const video = await prisma.video.update({
        where: { id },
        data: updateData,
      });

      return video;
    } catch (error: any) {
      fastify.log.error(error);

      if (error.code === 'P2002') {
        return reply.status(400).send({ error: 'A video with this slug already exists' });
      }

      reply.status(500).send({ error: 'Failed to update video' });
    }
  });

  // DELETE /api/v1/videos/:id - Supprimer une vidéo
  fastify.delete('/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };

      await prisma.video.delete({
        where: { id },
      });

      return { message: 'Video deleted successfully' };
    } catch (error: any) {
      fastify.log.error(error);

      if (error.code === 'P2025') {
        return reply.status(404).send({ error: 'Video not found' });
      }

      reply.status(500).send({ error: 'Failed to delete video' });
    }
  });
};

export default videoRoutes;

