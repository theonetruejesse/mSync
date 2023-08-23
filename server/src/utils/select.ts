import { Channel, User, Contact, Role, Membership } from "../types/prisma";
import {
  formatChannel,
  formatUser,
  formatContact,
  formatRole,
  formatMembership
} from "./format";
import {
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder
} from "discord.js";

export function buildChannelSelectMenu(channels: Channel[]) {
  return new StringSelectMenuBuilder().addOptions(
    channels.map((channel) =>
      new StringSelectMenuOptionBuilder()
        .setLabel(formatChannel(channel))
        .setValue(channel.id.toString())
    )
  );
}

export function buildUserSelectMenu(users: User[]) {
  return new StringSelectMenuBuilder().addOptions(
    users.map((user) =>
      new StringSelectMenuOptionBuilder()
        .setLabel(formatUser(user))
        .setValue(user.id.toString())
    )
  );
}

export function buildContactSelectMenu(contacts: Contact[]) {
  return new StringSelectMenuBuilder().addOptions(
    contacts.map((contact) =>
      new StringSelectMenuOptionBuilder()
        .setLabel(formatContact(contact))
        .setValue(contact.id.toString())
    )
  );
}

export function buildRoleSelect(roles: Role[]) {
  return new StringSelectMenuBuilder().addOptions(
    roles.map((role) =>
      new StringSelectMenuOptionBuilder()
        .setLabel(formatRole(role))
        .setValue(role.id.toString())
    )
  );
}

export function buildMembershipSelect(memberships: Membership[]) {
  return new StringSelectMenuBuilder().addOptions(
    memberships.map((membership) =>
      new StringSelectMenuOptionBuilder()
        .setLabel(formatMembership(membership))
        .setValue(membership.id.toString())
    )
  );
}
