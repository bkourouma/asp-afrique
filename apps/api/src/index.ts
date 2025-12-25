import Fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import fastifyCors from '@fastify/cors'
import fastifyMultipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'
import path from 'path'
import dotenv from 'dotenv'
import { prisma } from '@packages/db'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import formationRoutes from './routes/formations.js'
import contactRoutes from './routes/contact.js'
import consultingRoutes from './routes/consulting.js'
// import partnersRoutes from './routes/partners.js' // Disabled - Partner model not in schema
import uploadRoutes from './routes/upload.js'
import blogRoutes from './routes/blog.js'
import videoRoutes from './routes/videos.js'
import { authenticate } from './middleware/auth.js'

dotenv.config()

const app = Fastify({
  logger: true
})

const PORT = parseInt(process.env.PORT || process.env.API_PORT || '3004', 10)
const HOST = process.env.API_HOST || '0.0.0.0'
const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-secret-key-change-in-production'

// Register plugins
app.register(fastifyCors, {
  origin: [
    process.env.CORS_ORIGIN || 'http://localhost:3001',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
})

app.register(fastifyJwt, {
  secret: JWT_SECRET,
  sign: {
    expiresIn: '15m'
  }
})

app.register(fastifyMultipart, {
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
})

// Serve static files from uploads directory
app.register(fastifyStatic, {
  root: path.join(process.cwd(), 'apps/api/uploads'),
  prefix: '/uploads/',
  decorateReply: false
})

// Register authentication decorator
app.decorate('authenticate', authenticate)

// Health check endpoint
app.get('/health', async (request, reply) => {
  return { status: 'ok', timestamp: new Date().toISOString() }
})

// API v1 routes
app.register(authRoutes, { prefix: '/api/v1/auth' })
app.register(userRoutes, { prefix: '/api/v1/users' })
app.register(formationRoutes, { prefix: '/api/v1/formations' })
app.register(contactRoutes, { prefix: '/api/v1/contact' })
app.register(consultingRoutes, { prefix: '/api/v1/consulting' })
// app.register(partnersRoutes, { prefix: '/api/v1/partners' }) // Disabled - Partner model not in schema
app.register(uploadRoutes, { prefix: '/api/v1/upload' })
app.register(blogRoutes, { prefix: '/api/v1/blog' })
app.register(videoRoutes, { prefix: '/api/v1/videos' })

// Error handler
app.setErrorHandler((error, request, reply) => {
  app.log.error(error)
  reply.status(500).send({
    error: 'Internal server error',
    message:
  process.env.NODE_ENV === 'development'
    ? (error instanceof Error ? error.message : String(error))
    : undefined
  })
})

// Start server
const start = async () => {
  try {
    // Test database connection (optional)
    try {
      await prisma.$queryRaw`SELECT 1`
      console.log('✅ Database connected')
    } catch (dbErr) {
      console.warn('⚠️  Database connection failed:', (dbErr as Error).message)
      console.warn('⚠️  Server will start without database')
    }

    await app.listen({ port: PORT, host: HOST })
    console.log(`✅ Server running at http://${HOST}:${PORT}`)
    console.log(`📚 API Documentation: http://${HOST}:${PORT}/api/v1`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully...')
  await app.close()
  await prisma.$disconnect()
  process.exit(0)
})

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully...')
  await app.close()
  await prisma.$disconnect()
  process.exit(0)
})

export default app

