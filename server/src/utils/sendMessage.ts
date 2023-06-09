import { Participant } from "@prisma/client";
import { Platform } from "../types/platform";
import { sendTwilio } from "../requests/twilio";
import { sendDiscord } from "../requests/discord";

export const sendMessage = async (p: Participant, message: string) => {
  switch (p.platformId) {
    case Platform.SMS:
      console.log(`SMS message to ${p.messagingId}`);
      return await sendTwilio({ phoneNumber: p.messagingId, message });
    case Platform.DISCORD:
      console.log(`Discord message to ${p.messagingId}`);
      return await sendDiscord({ channelId: p.channelId, message });
    case Platform.LINE:
      console.log(`TODO: Line message to ${p.messagingId}`);
      return;
    default:
      console.log(`No message sent`);
      return;
  }
};
