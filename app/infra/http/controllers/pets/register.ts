import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function Register(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const registerBodySchema = z.object({
    organization_id: z.string().uuid(),
    name: z.string(),
    age: z.number(),
    description: z.string(),
    size: z.enum(['LITTLE', 'SMALL', 'MEDIUM', 'BIG']).nullable(),
    energy_level: z.enum(['LOW', 'AVERAGE', 'HIGH']).nullable(),
    independence_level: z.enum(['LOW', 'AVERAGE', 'HIGH']).nullable(),
    environment: z.enum(['WIDE', 'COZY', 'SAFE']).nullable(),
    requirements: z.array(z.string()).nullable(),
    photos: z.array(z.string()).nullable(),
  })

  const {
    organization_id: organizationId,
    name,
    age,
    description,
    size,
    energy_level: energyLevel,
    independence_level: independenceLevel,
    environment,
    requirements,
    photos,
  } = registerBodySchema.parse(request.body)
}
