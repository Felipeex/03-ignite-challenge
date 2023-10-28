import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organization-repository'
import { CreateOrganizationUseCase } from '../create-organization'

export function makeCreateOrganizations() {
  const usersRepository = new PrismaOrganizationsRepository()
  const createOrganization = new CreateOrganizationUseCase(usersRepository)

  return createOrganization
}
