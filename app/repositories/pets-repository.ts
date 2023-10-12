import { Pet, Prisma } from "@prisma/client";

export interface PetRepository {
  getById: (id: string) => Promise<Pet | null>;
  register: (data: Prisma.PetUncheckedCreateInput) => Promise<Pet>;
}
