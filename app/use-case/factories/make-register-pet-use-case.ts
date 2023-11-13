import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organization-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { RegisterPetUseCase } from '../register-pet'

export function MakeRegisterPet() {
  const petRepository = new PrismaPetsRepository()
  const organizationRepository = new PrismaOrganizationsRepository()
  const registerPet = new RegisterPetUseCase(
    petRepository,
    organizationRepository,
  )

  return registerPet
}
