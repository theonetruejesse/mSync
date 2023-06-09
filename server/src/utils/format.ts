import { Prisma, Role, User } from "@prisma/client";
import { convertNumStr } from "./convertNumStr";
import { Platform } from "../types/platform";

// typesafe query formatting took a minute to figure out
export const formatUserWhereInput = (userQuery: any): Prisma.UserWhereInput => {
  return {
    id: convertNumStr(userQuery.id),
    firstName: userQuery.firstName ?? undefined,
    lastName: userQuery.lastName ?? undefined,
  };
};

export const formatUserCreateInput = (
  userQuery: any
): Prisma.UserCreateInput | undefined => {
  if (!userQuery.firstName) return undefined;
  return {
    firstName: userQuery.firstName,
    lastName: userQuery.lastName ?? undefined,
  };
};

export const formatParticipantCreateInput = (
  participantQuery: any
): Prisma.ParticipantCreateInput | undefined => {
  const channelId: string = participantQuery.channelId;
  const messagingId: string = participantQuery.channelId;
  const platformId = convertNumStr(participantQuery.platformId);
  const roleId = convertNumStr(participantQuery.roleId);
  const userId = convertNumStr(participantQuery.userId);

  return channelId && messagingId && platformId && roleId && userId
    ? {
        channelId,
        messagingId,
        platform: {
          connect: { id: platformId },
        },
        role: {
          connect: { id: roleId },
        },
        user: {
          connect: { id: userId },
        },
      }
    : undefined;
};

// when platform origin is Discord, channelId should is provided
// todo double check messaging edgecases given setup:
// Discord users can be identified via channelId, hence they can have multiple convos (read/write)
// SMS and Line users will only be connected to one convo (read/write)
// this setup should be fine, given clients only need to be in 1 Collegiate GC at any given time
export type SendInput = {
  platformId: Platform;
  messagingId: string;
  channelId?: string;
  message: string;
};

export const formatSendInput = (sendQuery: any): SendInput | undefined => {
  const platformId = convertNumStr(sendQuery.platformId);
  if (!(platformId && Object.values(Platform).includes(platformId)))
    return undefined;

  return sendQuery.messagingId && sendQuery.message
    ? {
        platformId,
        messagingId: sendQuery.messagingId,
        message: sendQuery.message,
        channelId: sendQuery.channelId ?? undefined,
      }
    : undefined;
};

// currently assumes all numbers are from US/Canada
// (123) 456-789 => +1123456789
// todo, fix up; doesn't handle case +1 (123)-456-789
export const formatPhoneNumber = (phoneNumber: string) => {
  const cleaned = ("" + phoneNumber).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  return match ? "+1" + match[1] + match[2] + match[3] : null;
};

export const formatMessage = (user: User, role: Role, message: string) => {
  return `${user.firstName} (${role.name}): ${message}`;
};
