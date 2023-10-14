import { TestContext, beforeEach, describe, expect, it } from "vitest";
import { CreateOrganizationUseCase } from "./create-organization";
import { OrganizationRepository } from "@/repositories/organizations-repository";
import { InMemoryOrganizationsRepository } from "@/repositories/in-memory/in-memory-organizations-repository";
import { OrganizationWithSameEmailError } from "./erros/organization-with-same-email-error";
import { compare } from "bcrypt";

interface CreateOrganizationContext extends TestContext {
  organizationRepository: OrganizationRepository;
  sut: CreateOrganizationUseCase;
}

describe("Create organization (use-case)", () => {
  beforeEach(async (context: CreateOrganizationContext) => {
    context.organizationRepository = new InMemoryOrganizationsRepository();
    context.sut = new CreateOrganizationUseCase(context.organizationRepository);
  });

  it("should be able to create organization", async ({
    sut,
  }: CreateOrganizationContext) => {
    const { organization } = await sut.execute({
      responsibleName: "Felipe Lima Santos",
      responsibleEmail: "felipeexx48@gmail.com",
      address: "simple avenue",
      city: "New York",
      password: "123456",
      phone: "(18) 99999-9999",
      zipcode: "19210000",
    });

    expect(organization).toEqual(
      expect.objectContaining({
        responsibleEmail: "felipeexx48@gmail.com",
      })
    );
  });

  it("should not be able to create organization with the same email", async ({
    sut,
  }: CreateOrganizationContext) => {
    const email = "felipeexx48@gmail.com";
    await sut.execute({
      responsibleName: "Felipe Lima Santos",
      responsibleEmail: email,
      address: "simple avenue",
      city: "New York",
      password: "123456",
      phone: "(18) 99999-9999",
      zipcode: "19210000",
    });

    await expect(() =>
      sut.execute({
        responsibleName: "Felipe Lima Santos",
        responsibleEmail: email,
        address: "simple avenue",
        city: "New York",
        password: "123456",
        phone: "(18) 99999-9999",
        zipcode: "19210000",
      })
    ).rejects.toBeInstanceOf(OrganizationWithSameEmailError);
  });

  it("should hashed password correctly compared", async ({
    sut,
  }: CreateOrganizationContext) => {
    const { organization } = await sut.execute({
      responsibleName: "Felipe Lima Santos",
      responsibleEmail: "felipeexx48@gmail.com",
      address: "simple avenue",
      city: "New York",
      password: "123456",
      phone: "(18) 99999-9999",
      zipcode: "19210000",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      organization.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });
});
