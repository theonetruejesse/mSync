import { AdminMembership, ClientMembership, Channel } from "../types/prisma";
import { formatAdminMembership, formatClientMembership } from "../utils/format";
import axios from "axios";
import { prisma } from "./prisma";

export const send: {
  [platform: string]: (
    message: string,
    sender: AdminMembership | ClientMembership,
    channel: Channel
  ) => Promise<void> | void;
} = {
  discord: (
    message: string,
    sender: AdminMembership | ClientMembership,
    channel: Channel
  ) => {
    axios.post(
      `https://discord.com/api/v10/webhooks/${channel.webhookId}/${channel.webhookToken}`,
      {
        content: message,
        username: formatClientMembership(sender as ClientMembership)
      },
      {
        headers: {
          Authorization: `Bot ${process.env.DISCORD_TOKEN}`
        }
      }
    );
  },
  twilio: async (
    message: string,
    sender: AdminMembership | ClientMembership,
    channel: Channel
  ) => {
    const contacts = await prisma.client
      .findMany({
        where: {
          memberships: {
            some: {
              channelId: channel.id
            }
          }
        },
        include: {
          contacts: true
        }
      })
      .then((users) => users.map((user) => user.contacts).flat(1));
    for (const contact of contacts) {
      axios.post(
        `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`,
        {
          To: contact.contact,
          From: process.env.TWILIO_PHONE_NUMBER,
          Body: `${formatAdminMembership(
            sender as AdminMembership
          )}: ${message}`
        },
        {
          auth: {
            username: process.env.TWILIO_ACCOUNT_SID,
            password: process.env.TWILIO_AUTH_TOKEN
          }
        }
      );
    }
  }
};
