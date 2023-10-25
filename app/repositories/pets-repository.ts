import { $Enums, Pet, Prisma } from '@prisma/client'

export interface PetFilters {
  city: string
  size?: $Enums.Size
  energyLevel?: $Enums.EnergyLevel
  independenceLevel?: $Enums.IndependenceLevel
  environment?: $Enums.Environment
}

export interface PetRepository {
  getManyByFilters: (
    query: string,
    page: number,
    filters: PetFilters,
  ) => Promise<Pet[]>
  getById: (id: string) => Promise<Pet | null>
  register: (data: Prisma.PetUncheckedCreateInput) => Promise<Pet>
}
