import { FastifyInstance } from 'fastify'
import { Register } from './register'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', Register)
}
