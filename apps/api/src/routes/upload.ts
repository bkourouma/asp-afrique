import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import path from 'path'
import fs from 'fs'
import { promisify } from 'util'
import { authenticate } from '../middleware/auth.js'

const mkdir = promisify(fs.mkdir)
const stat = promisify(fs.stat)
const writeFile = promisify(fs.writeFile)

// Ensure upload directory exists
const ensureUploadDir = async () => {
  const uploadDir = path.join(process.cwd(), 'apps/api/uploads')
  try {
    await stat(uploadDir)
  } catch (error) {
    await mkdir(uploadDir, { recursive: true })
  }
  return uploadDir
}

// Generate unique filename
const generateFilename = (originalname: string) => {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
  const ext = path.extname(originalname)
  const name = path.basename(originalname, ext)
  return `${name}-${uniqueSuffix}${ext}`
}

// Validate file type
const isValidFileType = (filename: string, mimetype: string) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/
  const extname = allowedTypes.test(path.extname(filename).toLowerCase())
  const mimetypeValid = allowedTypes.test(mimetype)
  return extname && mimetypeValid
}

export default async function uploadRoutes(fastify: FastifyInstance) {
  // Upload single file
  fastify.post(
    '/',
    {
      preHandler: [authenticate]
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const user = request.user as any
        if (!user.roles.includes('ADMIN')) {
          return reply.status(403).send({
            error: 'Admin access required'
          })
        }

        const data = await request.file()
        
        if (!data) {
          return reply.status(400).send({
            error: 'No file uploaded'
          })
        }

        // Validate file type
        if (!isValidFileType(data.filename, data.mimetype)) {
          return reply.status(400).send({
            error: 'Only image files are allowed (jpeg, jpg, png, gif, webp)'
          })
        }

        // Check file size (5MB limit)
        const fileSize = data.file.bytesRead
        if (fileSize > 5 * 1024 * 1024) {
          return reply.status(400).send({
            error: 'File size too large. Maximum 5MB allowed.'
          })
        }

        // Ensure upload directory exists
        const uploadDir = await ensureUploadDir()
        
        // Generate unique filename
        const filename = generateFilename(data.filename)
        const filepath = path.join(uploadDir, filename)

        // Save file
        const buffer = await data.toBuffer()
        await writeFile(filepath, buffer)

        return reply.send({
          success: true,
          filename: filename,
          originalName: data.filename,
          size: fileSize,
          mimetype: data.mimetype,
          url: `/uploads/${filename}`
        })
      } catch (error) {
        fastify.log.error(error)
        return reply.status(500).send({
          error: 'Internal server error'
        })
      }
    }
  )

  // Upload multiple files
  fastify.post(
    '/multiple',
    {
      preHandler: [authenticate]
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const user = request.user as any
        if (!user.roles.includes('ADMIN')) {
          return reply.status(403).send({
            error: 'Admin access required'
          })
        }

        const files = request.files()
        const uploadedFiles = []
        const errors = []

        // Ensure upload directory exists
        const uploadDir = await ensureUploadDir()

        for await (const data of files) {
          try {
            // Validate file type
            if (!isValidFileType(data.filename, data.mimetype)) {
              errors.push({
                filename: data.filename,
                error: 'Invalid file type'
              })
              continue
            }

            // Check file size (5MB limit)
            const fileSize = data.file.bytesRead
            if (fileSize > 5 * 1024 * 1024) {
              errors.push({
                filename: data.filename,
                error: 'File size too large'
              })
              continue
            }

            // Generate unique filename
            const filename = generateFilename(data.filename)
            const filepath = path.join(uploadDir, filename)

            // Save file
            const buffer = await data.toBuffer()
            await writeFile(filepath, buffer)

            uploadedFiles.push({
              filename: filename,
              originalName: data.filename,
              size: fileSize,
              mimetype: data.mimetype,
              url: `/uploads/${filename}`
            })
          } catch (fileError) {
            errors.push({
              filename: data.filename,
              error: 'Failed to process file'
            })
          }
        }

        return reply.send({
          success: true,
          uploadedFiles,
          errors,
          totalUploaded: uploadedFiles.length,
          totalErrors: errors.length
        })
      } catch (error) {
        fastify.log.error(error)
        return reply.status(500).send({
          error: 'Internal server error'
        })
      }
    }
  )

  // Get uploaded files list (admin only)
  fastify.get(
    '/files',
    {
      preHandler: [authenticate]
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const user = request.user as any
        if (!user.roles.includes('ADMIN')) {
          return reply.status(403).send({
            error: 'Admin access required'
          })
        }

        const uploadDir = path.join(process.cwd(), 'apps/api/uploads')
        
        try {
          const files = await fs.promises.readdir(uploadDir)
          const fileList = []

          for (const file of files) {
            const filepath = path.join(uploadDir, file)
            const stats = await fs.promises.stat(filepath)
            
            if (stats.isFile()) {
              fileList.push({
                filename: file,
                size: stats.size,
                createdAt: stats.birthtime,
                modifiedAt: stats.mtime,
                url: `/uploads/${file}`
              })
            }
          }

          return reply.send({
            success: true,
            files: fileList.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
          })
        } catch (error) {
          return reply.send({
            success: true,
            files: []
          })
        }
      } catch (error) {
        fastify.log.error(error)
        return reply.status(500).send({
          error: 'Internal server error'
        })
      }
    }
  )

  // Delete uploaded file (admin only)
  fastify.delete<{ Params: { filename: string } }>(
    '/:filename',
    {
      preHandler: [authenticate]
    },
    async (request: FastifyRequest<{ Params: { filename: string } }>, reply: FastifyReply) => {
      try {
        const user = request.user as any
        if (!user.roles.includes('ADMIN')) {
          return reply.status(403).send({
            error: 'Admin access required'
          })
        }

        const { filename } = request.params
        const uploadDir = path.join(process.cwd(), 'apps/api/uploads')
        const filepath = path.join(uploadDir, filename)

        try {
          await fs.promises.unlink(filepath)
          return reply.send({
            success: true,
            message: 'File deleted successfully'
          })
        } catch (error) {
          return reply.status(404).send({
            error: 'File not found'
          })
        }
      } catch (error) {
        fastify.log.error(error)
        return reply.status(500).send({
          error: 'Internal server error'
        })
      }
    }
  )
}