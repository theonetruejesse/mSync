import { Twilio } from "twilio";

export interface SendMessage {
  phoneNumber: string;
  message: string;
}

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = new Twilio(accountSid, authToken);

export const sendText = async (m: SendMessage) => {
  return await client.messages.create({
    from: process.env.TWILIO_NUMBER,
    to: m.phoneNumber,
    body: m.message,
  });
};
