import { PrismaClient } from "@prisma/client";

export class ContactResolver {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  create(userId: number, platformId: number, contact: string) {
    const { prisma } = this;

    return prisma.contact.create({
      data: {
        userId,
        platformId,
        contact
      }
    });
  }

  delete(ids: number[]) {
    const { prisma } = this;

    return prisma.channel.deleteMany({
      where: {
        id: {
          in: ids
        }
      }
    });
  }
};