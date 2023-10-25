import { PetFilters, PetRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface FetchPetsByFiltersRequest {
  query: string
  page?: number
  filters: PetFilters
}

interface FetchPetsByFiltersResponse {
  pets: Pet[]
}

export class FetchPetsByFiltersUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({
    query,
    page = 1,
    filters,
  }: FetchPetsByFiltersRequest): Promise<FetchPetsByFiltersResponse> {
    const pets = await this.petRepository.getManyByFilters(query, page, filters)

    return {
      pets,
    }
  }
}
