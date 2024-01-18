import { PrismaClient } from "@prisma/client";

export class ChannelResolver {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  create(discordId: string, name: string) {
    const { prisma } = this;

    return prisma.channel.create({
      data: {
        discordId,
        name
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

  getAll() {
    const { prisma } = this;

    return prisma.channel.findMany();
  }

  add(channelId: number, userIds: number[], roleIds: (number | undefined)[]=[]) {
    const { prisma } = this;

    return Promise.all(userIds.map((userId, index) => prisma.membership.create({
      data: {
        channelId,
        userId,
        roleId: roleIds[index]
      }
    })));

    // const data = [];
    // for (let i = 0; i < userIds.length; i++) {
    //   data.push({ channelId, userId: userIds[i], roleId: roleIds[i] });
    // }

    // return prisma.membership.createMany({
    //   data
    // });
  }

  remove(channelId: number, userIds: number[]) {
    const { prisma } = this;

    return prisma.membership.deleteMany({
      where: {
        channelId,
        userId: {
          in: userIds
        }
      }
    });
  }
};