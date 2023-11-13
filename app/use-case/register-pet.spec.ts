import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { OrganizationRepository } from '@/repositories/organizations-repository'
import { PetRepository } from '@/repositories/pets-repository'
import { TestContext, beforeEach, describe, expect, it } from 'vitest'
import { OrganizationNotExistError } from './erros/organization-not-exist-error'
import { RegisterPetUseCase } from './register-pet'

interface RegisterPetContext extends TestContext {
  PetRepository: PetRepository
  OrganizationRepository: OrganizationRepository
  sut: RegisterPetUseCase
}

describe('Register Pet (use-case)', () => {
  beforeEach(async (context: RegisterPetContext) => {
    context.PetRepository = new InMemoryPetsRepository()
    context.OrganizationRepository = new InMemoryOrganizationsRepository()
    context.sut = new RegisterPetUseCase(
      context.PetRepository,
      context.OrganizationRepository,
    )
  })

  it('should be able to create pet', async ({
    sut,
    OrganizationRepository,
  }: RegisterPetContext) => {
    OrganizationRepository.create({
      id: 'organization-01',
      responsibleName: 'Felipe Lima Santos',
      responsibleEmail: 'felipeexx48@gmail.com',
      address: 'simple avenue',
      city: 'New York',
      phone: '(18) 99999-9999',
      zipcode: '19210000',
      password_hash: 'nothing',
    })

    const { pet } = await sut.execute({
      name: 'Bob',
      age: 5,
      description: "He's so cute",
      organizationId: 'organization-01',
    })

    expect(pet).toEqual(
      expect.objectContaining({
        name: 'Bob',
      }),
    )
  })

  it('should not be able to create pet with the organization not exist', async ({
    sut,
  }: RegisterPetContext) => {
    await expect(() =>
      sut.execute({
        name: 'Bob',
        age: 5,
        description: "He's so cute",
        organizationId: 'organization-02',
      }),
    ).rejects.toBeInstanceOf(OrganizationNotExistError)
  })
})
