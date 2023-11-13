import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { OrganizationRepository } from '../organizations-repository'

export class PrismaOrganizationsRepository implements OrganizationRepository {
  async findById(id: string) {
    const findedById = prisma.organization.findUnique({
      where: { id },
    })

    return findedById
  }

  async findByEmail(email: string) {
    const findedByEmail = prisma.organization.findUnique({
      where: { responsibleEmail: email },
    })

    return findedByEmail
  }

  async create(data: Prisma.OrganizationCreateInput) {
    const created = prisma.organization.create({
      data,
    })

    return created
  }
}
