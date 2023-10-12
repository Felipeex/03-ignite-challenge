import { Prisma, Organization } from "@prisma/client";
import { OrganizationRepository } from "../organizations-repository";
import { randomUUID } from "node:crypto";

export class InMemoryOrganizationsRepository implements OrganizationRepository {
  public InMemoryOrganizations: Organization[] = [];

  async findByEmail(email: string) {
    const findSameEmail = this.InMemoryOrganizations.find(
      (organization) => organization.responsibleEmail === email
    );

    if (!findSameEmail) {
      return null;
    }

    return findSameEmail;
  }

  async create(data: Prisma.OrganizationCreateInput) {
    const organization = {
      id: data.id ?? randomUUID(),
      responsibleName: data.responsibleName,
      responsibleEmail: data.responsibleEmail,
      password_hash: data.password_hash,
      phone: data.phone,
      address: data.address,
      city: data.city,
      zipcode: data.zipcode,
    };

    this.InMemoryOrganizations.push(organization);
    return organization;
  }
}
