import { OrganizationRepository } from '@/repositories/organizations-repository'
import { Organization } from '@prisma/client'
import { hash } from 'bcrypt'
import { OrganizationWithSameEmailError } from './erros/organization-with-same-email-error'

interface CreateOrganizationRequest {
  responsibleName: string
  responsibleEmail: string
  password: string
  phone: string
  address: string
  city: string
  zipcode: string
}

interface CreateOrganizationResponse {
  organization: Organization
}

export class CreateOrganizationUseCase {
  constructor(private organizationRepository: OrganizationRepository) {}

  async execute({
    responsibleName,
    responsibleEmail,
    password,
    phone,
    address,
    city,
    zipcode,
  }: CreateOrganizationRequest): Promise<CreateOrganizationResponse> {
    const passwordHash = await hash(password, 6)
    const organizationWithSameEmail =
      await this.organizationRepository.findByEmail(responsibleEmail)

    if (organizationWithSameEmail) {
      throw new OrganizationWithSameEmailError()
    }

    const organization = await this.organizationRepository.create({
      responsibleName,
      responsibleEmail,
      password_hash: passwordHash,
      phone,
      address,
      city,
      zipcode,
    })

    return {
      organization,
    }
  }
}
