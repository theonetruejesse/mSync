import { prisma } from ".";
import { Prisma } from "@prisma/client";

// USER
export const getUsers = async (where: Prisma.UserWhereInput) => {
  return await prisma.user.findMany({ where });
};

export const getUser = async (where: Prisma.UserWhereInput) => {
  return await prisma.user.findFirst({ where });
};

export const createUser = async (data: Prisma.UserCreateInput) => {
  try {
    const user = await prisma.user.create({ data });
    return user;
  } catch (e) {
    return e;
  }
};

// ROLE
export const getRole = async (where: Prisma.RoleWhereInput) => {
  return await prisma.role.findFirst({ where });
};

export const getRoles = async () => {
  return await prisma.role.findMany();
};

// PARTICIPANT
export const getParticipants = async (where: Prisma.ParticipantWhereInput) => {
  return await prisma.participant.findMany({ where });
};

export const getParticipant = async (where: Prisma.ParticipantWhereInput) => {
  return await prisma.participant.findFirst({ where });
};

export const createParticipant = async (
  data: Prisma.ParticipantCreateInput
) => {
  try {
    const participant = await prisma.participant.create({ data });
    return participant;
  } catch (e) {
    // most likely invalid role, platform, or user ids
    return e;
  }
};
