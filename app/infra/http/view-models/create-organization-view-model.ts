import { Organization } from '@prisma/client'

export class createOrganizationViewModel {
  static toHTTP(data: Organization) {
    return {
      id: data.id,
    }
  }
}
