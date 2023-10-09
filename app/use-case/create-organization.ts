import { Organization } from "@prisma/client";
import { OrganizationRepository } from "@/repositories/organizations-repository";
import { OrganizationWithSameEmailError } from "./erros/organization-with-same-email-error";
import { hash } from "bcrypt";

interface CreateOrganizationRequest {
  responsibleName: string;
  responsibleEmail: string;
  password: string;
  phone: string;
  address: string;
  city: string;
  zipcode: string;
}

interface CreateOrganizationResponse {
  organization: Organization;
}

export class CreateOrganizationUseCase {
  constructor(private OrganizationRepository: OrganizationRepository) {}

  async execute({
    responsibleName,
    responsibleEmail,
    password,
    phone,
    address,
    city,
    zipcode,
  }: CreateOrganizationRequest): Promise<CreateOrganizationResponse> {
    const password_hash = await hash(password, 6);
    const organizationWithSameEmail =
      await this.OrganizationRepository.findByEmail(responsibleEmail);

    if (organizationWithSameEmail) {
      throw new OrganizationWithSameEmailError();
    }

    const organization = await this.OrganizationRepository.create({
      responsibleName,
      responsibleEmail,
      password_hash,
      phone,
      address,
      city,
      zipcode,
    });

    return {
      organization,
    };
  }
}
