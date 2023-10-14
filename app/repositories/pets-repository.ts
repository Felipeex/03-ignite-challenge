import { Pet, Prisma } from "@prisma/client";

export interface PetRepository {
  getManyByCharacteristics: (
    characteristics: string,
    page: number
  ) => Promise<Pet[]>;
  getById: (id: string) => Promise<Pet | null>;
  register: (data: Prisma.PetUncheckedCreateInput) => Promise<Pet>;
}
