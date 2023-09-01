import { Membership, Channel } from "../types/prisma";
import { formatMembership } from "../utils/format";
import axios from "axios";
import { prisma } from "./prisma";

export const send: {
  [platform: string]: (
    message: string,
    sender: Membership,
    channel: Channel
  ) => Promise<void> | void;
} = {
  discord: (message: string, sender: Membership, channel: Channel) => {
    axios.post(
      `https://discord.com/api/v10/webhooks/${channel.webhookId}/${channel.webhookToken}`,
      {
        content: message,
        username: formatMembership(sender)
      },
      {
        headers: {
          Authorization: `Bot ${process.env.DISCORD_TOKEN}`
        }
      }
    );
  },
  twilio: async (message: string, sender: Membership, channel: Channel) => {
    const contacts = await prisma.contact.findMany({
      where: {
        user: {
          memberships: {
            some: {
              channelId: channel.id
            }
          }
        }
      }
    });
    for (const contact of contacts) {
      axios.post(
        `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`,
        {
          To: contact.contact,
          From: process.env.TWILIO_PHONE_NUMBER,
          Body: `${formatMembership(sender)}: ${message}`
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
