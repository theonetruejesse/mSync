// https://www.twilio.com/docs/messaging/guides/webhook-request
export type MessageStatus =
  | "accepted"
  | "queued"
  | "sending"
  | "sent"
  | "failed"
  | "delivered"
  | "undelivered"
  | "receiving"
  | "received"
  | "read";

export type IncomingMessage = {
  MessageSid: string;
  SmsSid: string;
  AccountSid: string;
  MessagingServiceSid: string;
  From: string;
  To: string;
  Body: string;
  NumMedia: number;
} & Record<`MediaContentType${number}`, string> &
  Record<`MediaUrl${number}`, string> &
  Partial<{
    FromCity: string;
    FromState: string;
    FromZip: string;
    FromCountry: string;
    ToCity: string;
    ToState: string;
    ToZip: string;
    ToCountry: string;
  }> &
  Partial<{
    ProfileName: string;
    WaId: string;
    Forwarded: boolean;
    FrequentlyForwarded: boolean;
    ButtonText: string;
  }> &
  Partial<{
    Latitude: number;
    Longitude: number;
    Address: string;
    Label: string;
  }> &
  Partial<{
    ReferralBody: string;
    ReferralHeadline: string;
    ReferralSourceId: string;
    ReferralSourceType: string;
    ReferralSourceUrl: string;
    ReferralMediaId: string;
    ReferralMediaContentType: string;
    ReferralMediaUrl: string;
    ReferralNumMedia: number;
  }> &
  Partial<{
    OriginalRepliedMessageSender: string;
    OriginalRepliedMessageSid: string;
  }> &
  Partial<{
    MessageStatus: MessageStatus;
    SmsStatus: MessageStatus;
    RawDlrDoneDate: string;
  }>;
