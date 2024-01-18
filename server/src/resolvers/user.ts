import { PrismaClient } from "@prisma/client";

export class UserResolver {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  create(firstName: string, lastName: string | undefined) {
    const { prisma } = this;

    return prisma.user.create({
      data: {
        firstName,
        lastName
      }
    });
  }

  delete(ids: number[]) {
    const { prisma } = this;

    return prisma.user.deleteMany({
      where: {
        id: {
          in: ids
        }
      }
    });
  }
};