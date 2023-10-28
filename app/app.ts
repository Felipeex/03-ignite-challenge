import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './environment'
import { organizationRoutes } from './infra/http/controllers/organizations/routes'
import { petsRoutes } from './infra/http/controllers/pets/routes'
export const app = fastify()

app.register(organizationRoutes)
app.register(petsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
