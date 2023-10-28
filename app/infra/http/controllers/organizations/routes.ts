import { FastifyInstance } from 'fastify'
import { Create } from './create'

export async function organizationRoutes(app: FastifyInstance) {
  app.post('/organizations', Create)
}
