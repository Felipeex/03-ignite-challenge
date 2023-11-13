import { Pet } from '@prisma/client'

export class RegisterPetViewModel {
  static toHTTP(pet: Pet) {
    return {
      name: pet.name,
      age: pet.age,
      description: pet.description,
      size: pet.size,
      energy_level: pet.energy_level,
      independence_level: pet.independence_level,
      environment: pet.environment,
      requirements: pet.requirements,
      photos: pet.photos,
    }
  }
}
