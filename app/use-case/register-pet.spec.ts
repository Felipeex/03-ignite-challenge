import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { PetRepository } from '@/repositories/pets-repository'
import { TestContext, beforeEach, describe, expect, it } from 'vitest'
import { RegisterPetUseCase } from './register-pet'

interface RegisterPetContext extends TestContext {
  PetRepository: PetRepository
  sut: RegisterPetUseCase
}

describe('Register Pet (use-case)', () => {
  beforeEach(async (context: RegisterPetContext) => {
    context.PetRepository = new InMemoryPetsRepository()
    context.sut = new RegisterPetUseCase(context.PetRepository)
  })

  it('should be able to create pet', async ({ sut }: RegisterPetContext) => {
    const { pet } = await sut.execute({
      name: 'Bob',
      age: 5,
      description: "He's so cute",
      organization_id: 'organization-01',
    })

    expect(pet).toEqual(
      expect.objectContaining({
        name: 'Bob',
      }),
    )
  })
})
