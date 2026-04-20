import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './generated/prisma/client.js'

type PrismaTodoClient = {
  todo: {
    findMany: (args: { orderBy: { createdAt: 'desc' } }) => Promise<unknown[]>
    create: (args: { data: { title: string } }) => Promise<unknown>
  }
  __isPrismaStub?: boolean
}

function createPrismaClient() {
  if (!process.env.DATABASE_URL) {
    return undefined
  }

  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  })

  return new PrismaClient({ adapter }) as PrismaTodoClient
}

declare global {
  var __prisma: PrismaTodoClient | undefined
}

export const prisma = globalThis.__prisma || createPrismaClient()
export const isPrismaDemoReady = Boolean(prisma && !prisma.__isPrismaStub)

if (process.env.NODE_ENV !== 'production' && prisma) {
  globalThis.__prisma = prisma
}
