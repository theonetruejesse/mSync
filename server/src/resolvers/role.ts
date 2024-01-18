import { PrismaClient } from "@prisma/client";

export class RoleResolver {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  create(name: string) {
    const { prisma } = this;

    return prisma.role.create({
      data: {
        name
      }
    });
  }

  delete(ids: number[]) {
    const { prisma } = this;

    return prisma.role.deleteMany({
      where: {
        id: {
          in: ids
        }
      }
    });
  }
};