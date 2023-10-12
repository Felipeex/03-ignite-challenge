import { PetRepository } from "@/repositories/pets-repository";
import { $Enums, Pet } from "@prisma/client";

interface RegisterPetRequest {
  organization_id: string;
  name: string;
  age: number;
  description: string;
  size?: $Enums.Size;
  energy_level?: $Enums.EnergyLevel;
  independence_level?: $Enums.IndependenceLevel;
  environment?: $Enums.Environment;
  requirements?: string[];
  photos?: string[];
}

interface RegisterPetResponse {
  pet: Pet;
}

export class RegisterPetUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({
    name,
    age,
    description,
    size,
    energy_level,
    independence_level,
    environment,
    organization_id,
    requirements,
    photos,
  }: RegisterPetRequest): Promise<RegisterPetResponse> {
    const pet = await this.petRepository.register({
      name,
      age,
      description,
      size,
      energy_level,
      independence_level,
      environment,
      requirements,
      photos,
      organization_id,
    });

    return {
      pet,
    };
  }
}
