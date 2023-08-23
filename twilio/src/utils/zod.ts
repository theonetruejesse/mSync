import { z } from "zod";
import { MessageStatus, IncomingMessage } from "../types/twilio";

export const $z = {
  // https://www.twilio.com/docs/messaging/guides/webhook-request
  messageStatus: (): z.ZodType<MessageStatus> =>
    z.union([
      z.literal("accepted"),
      z.literal("queued"),
      z.literal("sending"),
      z.literal("sent"),
      z.literal("failed"),
      z.literal("delivered"),
      z.literal("undelivered"),
      z.literal("received"),
      z.literal("read")
    ]),
  incomingMessage: (): z.ZodType<IncomingMessage> =>
    z
      .object({
        MessageSid: z.string().length(34),
        SmsSid: z.string().length(34),
        AccountSid: z.string().length(34),
        MessagingServiceSid: z.string().length(34),
        From: z.string(),
        To: z.string(),
        Body: z.string(),
        NumMedia: z.number().int().nonnegative()
      })
      .catchall(
        z.record(
          z.string().refine((i) => /MediaContentType\d+/.test(i)),
          z.string()
        )
      )
      .catchall(
        z.record(
          z.string().refine((i) => /MediaUrl\d+/.test(i)),
          z.string()
        )
      )
      .merge(
        z
          .object({
            FromCity: z.string(),
            FromState: z.string(),
            FromZip: z.string(),
            FromCountry: z.string(),
            ToCity: z.string(),
            ToState: z.string(),
            ToZip: z.string(),
            ToCountry: z.string()
          })
          .partial()
      )
      .merge(
        z
          .object({
            ProfileName: z.string(),
            WaId: z.string(),
            Forwarded: z.boolean(),
            FrequentlyForwarded: z.boolean(),
            ButtonText: z.string()
          })
          .partial()
      )
      .merge(
        z
          .object({
            Latitude: z.number(),
            Longitude: z.number(),
            Address: z.string(),
            Label: z.string()
          })
          .partial()
      )
      .merge(
        z
          .object({
            ReferralBody: z.string(),
            ReferralHeadline: z.string(),
            ReferralSourceId: z.string(),
            ReferralSourceType: z.string(),
            ReferralSourceUrl: z.string(),
            ReferralMediaId: z.string(),
            ReferralMediaContentType: z.string(),
            ReferralMediaUrl: z.string(),
            ReferralNumMedia: z.number()
          })
          .partial()
      )
      .merge(
        z
          .object({
            OriginalRepliedMessageSender: z.string(),
            OriginalRepliedMessageSid: z.string()
          })
          .partial()
      )
      .merge(
        z
          .object({
            MessageStatus: $z.messageStatus(),
            SmsStatus: $z.messageStatus(),
            RawDlrDoneDate: z.string()
          })
          .partial()
      )
};
