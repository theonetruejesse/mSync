import { PrismaClient } from "@prisma/client";

export class PlatformResolver {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  create(name: string) {
    const { prisma } = this;

    return prisma.platform.create({
      data: {
        name
      }
    });
  }

  delete(ids: number[]) {
    const { prisma } = this;

    return prisma.platform.deleteMany({
      where: {
        id: {
          in: ids
        }
      }
    });
  }
};