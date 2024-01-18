import type {
  Channel as PrismaChannel,
  Admin as PrismaAdmin,
  Client as PrismaClient,
  AdminContact as PrismaAdminContact,
  ClientContact as PrismaClientContact,
  AdminMembership as PrismaAdminMembership,
  ClientMembership as PrismaClientMembership
} from "@prisma/client";

export type Channel = PrismaChannel & {
  adminMemberships?: PrismaAdminMembership[];
  clientMemberships?: PrismaClientMembership[];
};

export type Admin = PrismaAdmin & {
  memberships?: AdminMembership[];
  contacts?: AdminContact[];
};

export type Client = PrismaClient & {
  memberships?: ClientMembership[];
  contacts?: ClientContact[];
};

export type AdminContact = PrismaAdminContact & {
  user?: Admin;
};

export type ClientContact = PrismaClientContact & {
  user?: Client;
};

export type AdminMembership = PrismaAdminMembership & {
  channel?: Channel;
  user?: Admin;
};

export type ClientMembership = PrismaClientMembership & {
  channel?: Channel;
  user?: Client;
};
