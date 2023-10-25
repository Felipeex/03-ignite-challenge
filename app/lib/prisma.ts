import { env } from '@/environment'
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
  log: env.NODE_ENV === 'developement' ? ['query'] : [],
})
