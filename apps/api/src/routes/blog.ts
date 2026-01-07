import { FastifyPluginAsync } from 'fastify';
import { prisma } from '@packages/db';

// Fonction pour calculer le temps de lecture
function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

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

const blogRoutes: FastifyPluginAsync = async (fastify) => {
  // GET /api/v1/blog - Récupérer tous les articles (publics ou tous pour admin)
  fastify.get('/', async (request, reply) => {
    try {
      const { status, category, search } = request.query as any;
      
      const where: any = {};

      // Si status='all', montrer tous les articles (pour l'admin)
      // Si status='published' ou 'draft', filtrer par ce statut
      // Sinon (par défaut), ne montrer que les articles publiés (pour le public)
      if (status && status !== 'all') {
        where.status = status;
      } else if (!status) {
        where.status = 'published';
      }
      // Si status='all', on ne met pas de filtre sur le statut
      
      if (category) {
        where.category = category;
      }
      
      if (search) {
        where.OR = [
          { title: { contains: search as string, mode: 'insensitive' } },
          { excerpt: { contains: search as string, mode: 'insensitive' } },
        ];
      }
      
      const articles = await prisma.blogArticle.findMany({
        where,
        orderBy: {
          createdAt: 'desc',
        },
      });
      
      return articles;
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Failed to fetch blog articles' });
    }
  });

  // GET /api/v1/blog/:id - Récupérer un article par ID
  fastify.get('/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      
      const article = await prisma.blogArticle.findUnique({
        where: { id },
      });
      
      if (!article) {
        return reply.status(404).send({ error: 'Article not found' });
      }
      
      return article;
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Failed to fetch blog article' });
    }
  });

  // GET /api/v1/blog/by-slug/:slug - Récupérer un article par slug
  fastify.get('/by-slug/:slug', async (request, reply) => {
    try {
      const { slug } = request.params as { slug: string };
      
      const article = await prisma.blogArticle.findUnique({
        where: { slug },
      });
      
      if (!article) {
        return reply.status(404).send({ error: 'Article not found' });
      }
      
      return article;
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Failed to fetch blog article' });
    }
  });

  // POST /api/v1/blog - Créer un nouvel article
  fastify.post('/', async (request, reply) => {
    try {
      const {
        title,
        slug: customSlug,
        content,
        excerpt,
        coverImage,
        category,
        tags,
        author,
        status,
        publishedAt,
      } = request.body as any;
      
      // Validation
      if (!title || !content || !excerpt || !category) {
        return reply.status(400).send({ 
          error: 'Missing required fields: title, content, excerpt, category' 
        });
      }
      
      // Générer le slug si non fourni
      const slug = customSlug || generateSlug(title);
      
      // Calculer le temps de lecture
      const readTime = calculateReadTime(content);
      
      // Si publié, ajouter la date de publication
      const articlePublishedAt = status === 'published' && !publishedAt 
        ? new Date() 
        : publishedAt 
        ? new Date(publishedAt) 
        : null;
      
      const article = await prisma.blogArticle.create({
        data: {
          title,
          slug,
          content,
          excerpt,
          coverImage,
          category,
          tags: tags || [],
          author: author || 'ASPCI',
          status: status || 'draft',
          publishedAt: articlePublishedAt,
          readTime,
        },
      });
      
      return reply.status(201).send(article);
    } catch (error: any) {
      fastify.log.error(error);
      
      if (error.code === 'P2002') {
        return reply.status(400).send({ error: 'An article with this slug already exists' });
      }
      
      reply.status(500).send({ error: 'Failed to create blog article' });
    }
  });

  // PUT /api/v1/blog/:id - Mettre à jour un article
  fastify.put('/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const {
        title,
        slug,
        content,
        excerpt,
        coverImage,
        category,
        tags,
        author,
        status,
        publishedAt,
      } = request.body as any;
      
      // Vérifier que l'article existe
      const existingArticle = await prisma.blogArticle.findUnique({
        where: { id },
      });
      
      if (!existingArticle) {
        return reply.status(404).send({ error: 'Article not found' });
      }
      
      const updateData: any = {};
      
      if (title !== undefined) updateData.title = title;
      if (slug !== undefined) updateData.slug = slug;
      if (content !== undefined) {
        updateData.content = content;
        updateData.readTime = calculateReadTime(content);
      }
      if (excerpt !== undefined) updateData.excerpt = excerpt;
      if (coverImage !== undefined) updateData.coverImage = coverImage;
      if (category !== undefined) updateData.category = category;
      if (tags !== undefined) updateData.tags = tags;
      if (author !== undefined) updateData.author = author;
      if (status !== undefined) {
        updateData.status = status;
        // Si on passe en publié et qu'il n'y a pas de date de publication, l'ajouter
        if (status === 'published' && !existingArticle.publishedAt) {
          updateData.publishedAt = new Date();
        }
      }
      if (publishedAt !== undefined) updateData.publishedAt = new Date(publishedAt);
      
      const article = await prisma.blogArticle.update({
        where: { id },
        data: updateData,
      });
      
      return article;
    } catch (error: any) {
      fastify.log.error(error);
      
      if (error.code === 'P2002') {
        return reply.status(400).send({ error: 'An article with this slug already exists' });
      }
      
      reply.status(500).send({ error: 'Failed to update blog article' });
    }
  });

  // DELETE /api/v1/blog/:id - Supprimer un article
  fastify.delete('/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      
      await prisma.blogArticle.delete({
        where: { id },
      });
      
      return { message: 'Article deleted successfully' };
    } catch (error: any) {
      fastify.log.error(error);
      
      if (error.code === 'P2025') {
        return reply.status(404).send({ error: 'Article not found' });
      }
      
      reply.status(500).send({ error: 'Failed to delete blog article' });
    }
  });
};

export default blogRoutes;
