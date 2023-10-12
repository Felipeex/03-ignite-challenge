import { TestContext, beforeEach, describe, expect, it } from "vitest";
import { PetRepository } from "@/repositories/pets-repository";
import { GetPetUseCase } from "./get-pet";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { Pet } from "@prisma/client";

interface GetPetContext extends TestContext {
  PetRepository: PetRepository & { InMemoryPets: Pet[] };
  sut: GetPetUseCase;
}

describe("Get Pet (use-case)", () => {
  beforeEach(async (context: GetPetContext) => {
    context.PetRepository = new InMemoryPetsRepository();
    context.sut = new GetPetUseCase(context.PetRepository);
  });

  it("should be able to get pet", async ({
    sut,
    PetRepository,
  }: GetPetContext) => {
    PetRepository.InMemoryPets.push({
      id: "pet-01",
      name: "Bob",
      age: 5,
      description: "He's so cute",
      organization_id: "organization-01",
      energy_level: "LOW",
      environment: "WIDE",
      independence_level: "LOW",
      size: "SMALL",
      photos: [""],
      requirements: [""],
    });

    const { pet } = await sut.execute({
      id: "pet-01",
    });

    expect(pet).toEqual(
      expect.objectContaining({
        id: "pet-01",
      })
    );
  });
});
