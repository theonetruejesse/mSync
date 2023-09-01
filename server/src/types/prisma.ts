import type {
  Channel as PrismaChannel,
  User as PrismaUser,
  Contact as PrismaContact,
  Role as PrismaRole,
  Membership as PrismaMembership
} from "@prisma/client";

export type Channel = PrismaChannel & { memberships?: Membership[] };

export type User = PrismaUser & {
  memberships?: Membership[];
  contacts?: Contact[];
};

export type Contact = PrismaContact & { user?: User };

export type Role = PrismaRole & { memberships?: Membership[] };

export type Membership = PrismaMembership & {
  channel?: Channel;
  user?: User;
  role?: Role;
};
