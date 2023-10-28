import { OrganizationWithSameEmailError } from '@/use-case/erros/organization-with-same-email-error'
import { makeCreateOrganizations } from '@/use-case/factories/make-create-organizations-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function Create(request: FastifyRequest, response: FastifyReply) {
  const createBodySchema = z.object({
    responsibleName: z.string(),
    responsibleEmail: z.string().email(),
    password: z.string(),
    phone: z.string(),
    address: z.string(),
    city: z.string(),
    zipcode: z.string(),
  })

  const {
    responsibleName,
    responsibleEmail,
    password,
    phone,
    address,
    city,
    zipcode,
  } = createBodySchema.parse(request.body)

  try {
    const usersRepository = makeCreateOrganizations()
    await usersRepository.execute({
      responsibleName,
      responsibleEmail,
      password,
      phone,
      address,
      city,
      zipcode,
    })
  } catch (err) {
    if (err instanceof OrganizationWithSameEmailError) {
      return response.status(409).send({ message: err.message })
    }

    throw err
  }
}
