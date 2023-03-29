import { Twilio } from "twilio";
import { SentMessage } from "./typings/message";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = new Twilio(accountSid, authToken);

export const sendText = (m: SentMessage) => {
  client.messages
    .create({
      from: process.env.TWILIO_NUMBER,
      to: m.reciever,
      body: m.message,
    })
    .then((message) => console.log(message.sid));
};
