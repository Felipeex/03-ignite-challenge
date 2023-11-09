import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { PetFilters, PetRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetRepository {
  async getManyByFilters(
    query: string,
    page: number,
    { city, energyLevel, environment, independenceLevel, size }: PetFilters,
  ) {
    const prepareForSearchWithSpaces = query.replace(' ', ' | ')

    const searchedByFilters = prisma.pet.findMany({
      where: {
        name: { search: prepareForSearchWithSpaces },
        description: { search: prepareForSearchWithSpaces },
        Organization: { city },
        size,
        environment,
        energy_level: energyLevel,
        independence_level: independenceLevel,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return searchedByFilters
  }

  async getById(id: string) {
    const findById = prisma.pet.findUnique({ where: { id } })

    return findById
  }

  async register(data: Prisma.PetUncheckedCreateInput) {
    const registed = prisma.pet.create({ data })

    return registed
  }
}
