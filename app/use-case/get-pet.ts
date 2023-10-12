import { PetRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";
import { ResourceNotFoundError } from "./erros/resource-not-found-error";

interface GetPedRequest {
  id: string;
}
interface GetPedResponse {
  pet: Pet;
}

export class GetPetUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({ id }: GetPedRequest): Promise<GetPedResponse> {
    const pet = await this.petRepository.getById(id);

    if (!pet) {
      throw new ResourceNotFoundError();
    }

    return { pet };
  }
}
