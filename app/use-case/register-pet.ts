import { PetRepository } from '@/repositories/pets-repository'
import { $Enums, Pet } from '@prisma/client'

interface RegisterPetRequest {
  organizationId: string
  name: string
  age: number
  description: string
  size?: $Enums.Size
  energyLevel?: $Enums.EnergyLevel
  independenceLevel?: $Enums.IndependenceLevel
  environment?: $Enums.Environment
  requirements?: string[]
  photos?: string[]
}

interface RegisterPetResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({
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
  }: RegisterPetRequest): Promise<RegisterPetResponse> {
    const pet = await this.petRepository.register({
      name,
      age,
      description,
      size,
      energy_level: energyLevel,
      independence_level: independenceLevel,
      environment,
      requirements,
      photos,
      organization_id: organizationId,
    })

    return {
      pet,
    }
  }
}
