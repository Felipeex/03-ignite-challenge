import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { PetRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { TestContext, beforeEach, describe, expect, it } from 'vitest'
import { FetchPetsByCharacteristicsUseCase } from './fetch-pets-by-characteristics'

interface GetPetContext extends TestContext {
  PetRepository: PetRepository & { InMemoryPets: Pet[] }
  sut: FetchPetsByCharacteristicsUseCase
}

describe('Fet Pets by characteristics (use-case)', () => {
  beforeEach(async (context: GetPetContext) => {
    context.PetRepository = new InMemoryPetsRepository()
    context.sut = new FetchPetsByCharacteristicsUseCase(context.PetRepository)
  })

  it('should be able to get pet by characteristics', async ({
    sut,
    PetRepository,
  }: GetPetContext) => {
    PetRepository.InMemoryPets.push({
      id: 'pet-01',
      name: 'Bob',
      age: 5,
      description: "He's so cute",
      organization_id: 'organization-01',
      energy_level: 'LOW',
      environment: 'WIDE',
      independence_level: 'LOW',
      size: 'SMALL',
      photos: [''],
      requirements: [''],
    })

    PetRepository.InMemoryPets.push({
      id: 'pet-01',
      name: 'Bob',
      age: 5,
      description: "He's so happy",
      organization_id: 'organization-01',
      energy_level: 'LOW',
      environment: 'WIDE',
      independence_level: 'LOW',
      size: 'SMALL',
      photos: [''],
      requirements: [''],
    })

    const { pets } = await sut.execute({ characteristics: 'happy' })
    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({ description: "He's so happy" }),
    ])
  })

  it('should be able fetch pets in second page', async ({
    sut,
    PetRepository,
  }: GetPetContext) => {
    for (let i = 0; i < 21; i++) {
      PetRepository.InMemoryPets.push({
        id: 'pet-01',
        name: 'Bob',
        age: 5,
        description: "He's so happy",
        organization_id: 'organization-01',
        energy_level: 'LOW',
        environment: 'WIDE',
        independence_level: 'LOW',
        size: 'SMALL',
        photos: [''],
        requirements: [''],
      })
    }

    const { pets } = await sut.execute({ characteristics: 'happy', page: 2 })
    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({ description: "He's so happy" }),
    ])
  })
})
