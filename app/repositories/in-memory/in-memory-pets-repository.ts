import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { PetFilters, PetRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetRepository {
  public InMemoryPets: Pet[] = []

  async getManyByFilters(
    query: string,
    page: number,
    {
      energyLevel,
      environment: filterEnvironment,
      independenceLevel,
      size: filterSize,
    }: PetFilters,
  ) {
    const findByQueryAndFilters = this.InMemoryPets.filter(
      ({
        name,
        description,
        age,
        energy_level,
        environment,
        independence_level,
        size,
      }) => {
        const petInformations = `${name} ${age} ${description}`

        if (energyLevel && energy_level !== energyLevel) return null
        if (filterEnvironment && environment !== filterEnvironment) return null
        if (independenceLevel && independence_level !== independenceLevel)
          return null
        if (filterSize && size !== filterSize) return null

        return petInformations.includes(query)
      },
    ).slice((page - 1) * 20, page * 20)

    return findByQueryAndFilters
  }

  async getById(id: string) {
    const findById = this.InMemoryPets.find((pet) => pet.id === id)

    if (!findById) {
      return null
    }

    return findById
  }

  async register(data: Prisma.PetUncheckedCreateInput) {
    const pet: Pet = {
      id: randomUUID(),
      name: data.name,
      age: data.age,
      description: data.description,
      size: data.size ?? 'LITTLE',
      energy_level: data.energy_level ?? 'LOW',
      independence_level: data.independence_level ?? 'LOW',
      environment: data.environment ?? 'WIDE',
      requirements: data.requirements as string[],
      photos: data.photos as string[],
      organization_id: data.organization_id,
    }

    this.InMemoryPets.push(pet)
    return pet
  }
}
