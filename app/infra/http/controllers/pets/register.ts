import { OrganizationNotExistError } from '@/use-case/erros/organization-not-exist-error'
import { MakeRegisterPet } from '@/use-case/factories/make-register-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { RegisterPetViewModel } from '../../view-models/register-pet-view-model'

export async function Register(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const registerBodySchema = z.object({
    organization_id: z.string().uuid(),
    name: z.string(),
    age: z.number(),
    description: z.string(),
    size: z.enum(['LITTLE', 'SMALL', 'MEDIUM', 'BIG']).default('LITTLE'),
    energy_level: z.enum(['LOW', 'AVERAGE', 'HIGH']).default('LOW'),
    independence_level: z.enum(['LOW', 'AVERAGE', 'HIGH']).default('LOW'),
    environment: z.enum(['WIDE', 'COZY', 'SAFE']).default('WIDE'),
    requirements: z.array(z.string()).default([]),
    photos: z.array(z.string()).default([]),
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

  try {
    const petRepository = MakeRegisterPet()
    const { pet } = await petRepository.execute({
      organizationId,
      name,
      age,
      description,
      size,
      energyLevel,
      independenceLevel,
      environment,
      requirements,
      photos,
    })

    response.status(201).send(RegisterPetViewModel.toHTTP(pet))
  } catch (err) {
    if (err instanceof OrganizationNotExistError) {
      return response.status(404).send({ message: err.message })
    }

    throw err
  }
}
