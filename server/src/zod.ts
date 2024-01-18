import { z } from "zod";
import type { User, Contact, Role, Platform, Channel, Membership } from "@prisma/client";

export const $z: {
  user: z.ZodType<User>,
  contact: z.ZodType<Contact>,
  role: z.ZodType<Role>,
  platform: z.ZodType<Platform>,
  channel: z.ZodType<Channel>,
  membership: z.ZodType<Membership>,
} = {
  user: z.lazy(() => z.object({
    id: z.number().int(),
    firstName: z.string(),
    lastName: z.string().nullable(),
    memberships: $z.membership.array().optional(),
    contacts: $z.contact.array().optional()
  })),
  contact: z.lazy(() => z.object({
    id: z.number().int(),
    user: $z.user.optional(),
    userId: z.number().int(),
    platform: $z.platform.optional(),
    platformId: z.number().int(),
    contact: z.string()
  })),
  role: z.lazy(() => z.object({
    id: z.number().int(),
    name: z.string(),
    memberships: $z.membership.array().optional()
  })),
  platform: z.lazy(() => z.object({
    id: z.number().int(),
    name: z.string(),
    contacts: $z.contact.array().optional()
  })),
  channel: z.lazy(() => z.object({
    id: z.number().int(),
    discordId: z.string(),
    name: z.string(),
    memberships: $z.membership.array().optional()
  })),
  membership: z.lazy(() => z.object({
    id: z.number().int(),
    channel: $z.channel.optional(),
    channelId: z.number().int(),
    user: $z.user.optional(),
    userId: z.number().int(),
    role: $z.role.optional(),
    roleId: z.number().int().nullable()
  }))
};