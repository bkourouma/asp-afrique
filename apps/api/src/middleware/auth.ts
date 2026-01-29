import { FastifyRequest, FastifyReply, preHandlerHookHandler } from 'fastify'

export const authenticate: preHandlerHookHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    await request.jwtVerify()
  } catch (err) {
    reply.status(401).send({ error: 'Unauthorized' })
  }
}