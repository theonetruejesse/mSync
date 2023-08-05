import { Prisma, Role, User } from "@prisma/client";
import { convertNumStr } from "./convertNumStr";
import { Platform } from "../types/platform";
import { SendInput } from "../types/sendInput";

// typesafe prisma query formatting; took a hote minute to figure out
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
  const messagingId: string = participantQuery.messagingId;
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

export const formatSendInput = (sendQuery: any): SendInput | undefined => {
  const platformId = convertNumStr(sendQuery.platformId);
  if (!(platformId && Object.values(Platform).includes(platformId)))
    return undefined;

  switch (platformId) {
    case Platform.SMS: // recieve endpoint from twilio webhook
      return sendQuery.From && sendQuery.Body
        ? {
            messagingId: formatPhoneNumber(sendQuery.From),
            message: sendQuery.Body,
          }
        : undefined;

    case Platform.DISCORD:
      // unlike other platforms, discord users need to send channelId
      return sendQuery.messagingId && sendQuery.message && sendQuery.channelId
        ? {
            messagingId: sendQuery.messagingId,
            message: sendQuery.message,
            channelId: sendQuery.channelId,
          }
        : undefined;

    default:
      return sendQuery.messagingId && sendQuery.message
        ? {
            messagingId: sendQuery.messagingId,
            message: sendQuery.message,
            channelId: sendQuery.channelId ?? undefined,
          }
        : undefined;
  }
};

// OLD, USE LATER
// currently assumes all numbers are from US/Canada
// (123) 456-789 => +1123456789
// todo, fix up; doesn't handle case +1 (123)-456-789
// todo, determine consistent style for numbers
// export const formatPhoneNumber = (str: string) => {
//   return str.replace(/[^a-zA-Z0-9 ]/g, "");
// };

// todo, determine consistent style for numbers
export const formatPhoneNumber = (str: string) => {
  return str.replace(/[^a-zA-Z0-9 ]/g, "");
};

export const formatMessage = (user: User, role: Role, message: string) => {
  return `${user.firstName} (${role.name}): ${message}`;
};
