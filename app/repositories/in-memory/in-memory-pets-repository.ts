import { Pet, Prisma } from "@prisma/client";
import { PetRepository } from "../pets-repository";
import { randomUUID } from "node:crypto";

export class InMemoryPetsRepository implements PetRepository {
  public InMemoryPets: Pet[] = [];

  async getById(id: string) {
    const findById = this.InMemoryPets.find((pet) => pet.id === id);

    if (!findById) {
      return null;
    }

    return findById;
  }

  async register(data: Prisma.PetUncheckedCreateInput) {
    const pet: Pet = {
      id: randomUUID(),
      name: data.name,
      age: data.age,
      description: data.description,
      size: data.size ?? "LITTLE",
      energy_level: data.energy_level ?? "LOW",
      independence_level: data.independence_level ?? "LOW",
      environment: data.environment ?? "WIDE",
      requirements: data.requirements as string[],
      photos: data.photos as string[],
      organization_id: data.organization_id,
    };

    this.InMemoryPets.push(pet);
    return pet;
  }
}
