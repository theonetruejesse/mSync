import {
  Channel,
  Admin,
  Client,
  AdminContact,
  ClientContact,
  AdminMembership,
  ClientMembership
} from "../types/prisma";
import {
  formatChannel,
  formatAdmin,
  formatClient,
  formatAdminContact,
  formatClientContact,
  formatAdminMembership,
  formatClientMembership
} from "./format";
import {
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder
} from "discord.js";

export function buildSelectMenu<T>(
  options: T[],
  labelFn: (option: T) => string,
  valueFn: (option: T) => string
) {
  return new StringSelectMenuBuilder().addOptions(
    options.map((option) =>
      new StringSelectMenuOptionBuilder()
        .setLabel(labelFn(option))
        .setValue(valueFn(option))
    )
  );
}

export function buildChannelSelect(channels: Channel[]) {
  return buildSelectMenu<Channel>(channels, formatChannel, (channel) =>
    channel.id.toString()
  );
}

export function buildAdminSelect(users: Admin[]) {
  return buildSelectMenu<Admin>(users, formatAdmin, (user) =>
    user.id.toString()
  );
}

export function buildClientSelect(users: Client[]) {
  return buildSelectMenu<Client>(users, formatClient, (user) =>
    user.id.toString()
  );
}

export function buildAdminContactSelect(contacts: AdminContact[]) {
  return buildSelectMenu<AdminContact>(
    contacts,
    formatAdminContact,
    (contact) => contact.id.toString()
  );
}

export function buildClientContactSelect(contacts: ClientContact[]) {
  return buildSelectMenu<ClientContact>(
    contacts,
    formatClientContact,
    (contact) => contact.id.toString()
  );
}

export function buildAdminMembershipSelect(memberships: AdminMembership[]) {
  return buildSelectMenu<AdminMembership>(
    memberships,
    formatAdminMembership,
    (membership) => membership.id.toString()
  );
}

export function buildClientMembershipSelect(memberships: ClientMembership[]) {
  return buildSelectMenu<ClientMembership>(
    memberships,
    formatClientMembership,
    (membership) => membership.id.toString()
  );
}
