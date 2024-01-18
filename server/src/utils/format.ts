import {
  Channel,
  Admin,
  Client,
  AdminContact,
  ClientContact,
  AdminMembership,
  ClientMembership
} from "../types/prisma";

export function capitalize(string: string) {
  return string.at(0)?.toUpperCase() + string.slice(1).toLowerCase();
}

export function formatChannel(channel: Channel) {
  return channel.name;
}

export function formatAdmin(user: Admin) {
  return user.name;
}

export function formatClient(user: Client) {
  return user.name;
}

export function formatAdminContact(contact: AdminContact) {
  let rv = contact.contact;
  rv += " (";
  rv += "Discord";
  if (contact.user) {
    rv += ", " + formatAdmin(contact.user);
  }
  rv += ")";
  return rv;
}

export function formatClientContact(contact: ClientContact) {
  let rv = contact.contact;
  rv += " (";
  rv += "Twilio";
  if (contact.user) {
    rv += ", " + formatClient(contact.user);
  }
  rv += ")";
  return rv;
}

export function formatAdminRole(role: string) {
  return "Admin/" + role;
}

export function formatClientRole(role: string) {
  return "Client/" + role;
}

export function formatAdminMembership(membership: AdminMembership) {
  if (membership.user) {
    let rv = formatAdmin(membership.user);
    rv += " (";
    rv += formatAdminRole(membership.role);
    if (membership.channel) {
      rv += ", " + formatChannel(membership.channel);
    }
    rv += ")";
    return rv;
  }
  if (membership.channel) {
    return (
      formatAdminRole(membership.role) +
      ", " +
      formatChannel(membership.channel)
    );
  }
  return formatAdminRole(membership.role);
}

export function formatClientMembership(membership: ClientMembership) {
  if (membership.user) {
    let rv = formatClient(membership.user);
    rv += " (";
    rv += formatClientRole(membership.role);
    if (membership.channel) {
      rv += ", " + formatChannel(membership.channel);
    }
    rv += ")";
    return rv;
  }
  if (membership.channel) {
    return (
      formatClientRole(membership.role) +
      ", " +
      formatChannel(membership.channel)
    );
  }
  return formatClientRole(membership.role);
}
