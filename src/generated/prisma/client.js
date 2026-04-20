const setupError = new Error(
  'Prisma demo is not configured yet. Set DATABASE_URL, then run pnpm db:generate and pnpm db:push.',
)

export class PrismaClient {
  constructor() {
    this.__isPrismaStub = true
    this.todo = {
      findMany: async () => [],
      create: async () => {
        throw setupError
      },
    }
  }
}
