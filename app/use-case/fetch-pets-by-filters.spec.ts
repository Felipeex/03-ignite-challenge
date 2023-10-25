import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { PetRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { TestContext, beforeEach, describe, expect, it } from 'vitest'
import { FetchPetsByFiltersUseCase } from './fetch-pets-by-filters'

interface GetPetContext extends TestContext {
  PetRepository: PetRepository & { InMemoryPets: Pet[] }
  sut: FetchPetsByFiltersUseCase
}

describe('Fet Pets by filters (use-case)', () => {
  beforeEach(async (context: GetPetContext) => {
    context.PetRepository = new InMemoryPetsRepository()
    context.sut = new FetchPetsByFiltersUseCase(context.PetRepository)
  })

  it('should be able to get pet by filters', async ({
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

    const { pets } = await sut.execute({
      query: 'happy',
      filters: { city: 'Boston' },
    })
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
        id: `pet-${i}`,
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

    const { pets } = await sut.execute({
      query: 'happy',
      filters: { city: 'Boston' },
      page: 2,
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({ description: "He's so happy" }),
    ])
  })

  it('should be able fetch pets with high energy level', async ({
    sut,
    PetRepository,
  }: GetPetContext) => {
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

    PetRepository.InMemoryPets.push({
      id: 'pet-02',
      name: 'Bob',
      age: 5,
      description: "He's so happy",
      organization_id: 'organization-01',
      energy_level: 'HIGH',
      environment: 'WIDE',
      independence_level: 'LOW',
      size: 'SMALL',
      photos: [''],
      requirements: [''],
    })

    const { pets } = await sut.execute({
      query: 'happy',
      filters: { city: 'Boston', energyLevel: 'HIGH' },
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ energy_level: 'HIGH' })])
  })

  it('should be able fetch pets with high independence level', async ({
    sut,
    PetRepository,
  }: GetPetContext) => {
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

    PetRepository.InMemoryPets.push({
      id: 'pet-02',
      name: 'Bob',
      age: 5,
      description: "He's so happy",
      organization_id: 'organization-01',
      energy_level: 'LOW',
      environment: 'WIDE',
      independence_level: 'HIGH',
      size: 'SMALL',
      photos: [''],
      requirements: [''],
    })

    const { pets } = await sut.execute({
      query: 'happy',
      filters: { city: 'Boston', independenceLevel: 'HIGH' },
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({ independence_level: 'HIGH' }),
    ])
  })

  it('should be able fetch pets with big size', async ({
    sut,
    PetRepository,
  }: GetPetContext) => {
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

    PetRepository.InMemoryPets.push({
      id: 'pet-02',
      name: 'Bob',
      age: 5,
      description: "He's so happy",
      organization_id: 'organization-01',
      energy_level: 'LOW',
      environment: 'WIDE',
      independence_level: 'LOW',
      size: 'BIG',
      photos: [''],
      requirements: [''],
    })

    const { pets } = await sut.execute({
      query: 'happy',
      filters: { city: 'Boston', size: 'BIG' },
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ size: 'BIG' })])
  })

  it('should be able fetch pets with safe environment', async ({
    sut,
    PetRepository,
  }: GetPetContext) => {
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

    PetRepository.InMemoryPets.push({
      id: 'pet-02',
      name: 'Bob',
      age: 5,
      description: "He's so happy",
      organization_id: 'organization-01',
      energy_level: 'LOW',
      environment: 'SAFE',
      independence_level: 'LOW',
      size: 'SMALL',
      photos: [''],
      requirements: [''],
    })

    const { pets } = await sut.execute({
      query: 'happy',
      filters: { city: 'Boston', environment: 'SAFE' },
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ environment: 'SAFE' })])
  })
})
