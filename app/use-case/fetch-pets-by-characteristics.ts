import { PetRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface FetchPetsByCharacteristicsRequest {
  characteristics: string;
  page?: number;
}

interface FetchPetsByCharacteristicsResponse {
  pets: Pet[];
}

export class FetchPetsByCharacteristicsUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({
    characteristics,
    page = 1,
  }: FetchPetsByCharacteristicsRequest): Promise<FetchPetsByCharacteristicsResponse> {
    const pets = await this.petRepository.getManyByCharacteristics(
      characteristics,
      page
    );

    return {
      pets,
    };
  }
}
