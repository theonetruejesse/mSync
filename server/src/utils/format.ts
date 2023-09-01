import { Channel, User, Contact, Role, Membership } from "../types/prisma";

export function capitalize(string: string) {
  return string.at(0)?.toUpperCase() + string.slice(1).toLowerCase();
}

export function formatPlatform(platform: string) {
  return capitalize(platform);
}

export function formatChannel(channel: Channel) {
  return channel.name;
}

export function formatUser(user: User) {
  return user.name;
}

export function formatContact(contact: Contact) {
  let rv = contact.contact;
  if (contact.user) {
    rv += " (";
    rv += formatUser(contact.user);
    rv += ")";
  }
  return rv;
}

export function formatRole(role: Role) {
  return role.name;
}

export function formatMembership(membership: Membership) {
  if (membership.user) {
    let rv = formatUser(membership.user);
    if (membership.channel || membership.role) {
      rv += " (";
      if (membership.role) rv += formatRole(membership.role);
      if (membership.channel) rv += ", " + formatChannel(membership.channel);
      rv += ")";
    }
    return rv;
  }
  if (membership.role) {
    let rv = formatRole(membership.role);
    if (membership.channel) {
      rv += " (";
      rv += formatChannel(membership.channel);
      rv += ")";
    }
    return rv;
  }
  let rv = "";
  if (membership.channel) {
    rv += " " + formatChannel(membership.channel);
  }
  return "membership";
}
