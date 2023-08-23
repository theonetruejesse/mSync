import { config } from "dotenv-safe";
import { Bot } from "./core/bot";

config();

export const bot = new Bot();
bot.init();

import axios from "axios";

axios.post(`http://localhost:${process.env.PORT}/message`, {
  MessageSid: "*".repeat(34),
  SmsSid: "*".repeat(34),
  AccountSid: "*".repeat(34),
  MessagingServiceSid: "*".repeat(34),
  From: "+16197308683",
  To: process.env.TWILIO_PHONE_NUMBER,
  Body: "/test -bc -n=2 -s='hello world'",
  NumMedia: 0
});
// MessageSid: string;
// SmsSid: string;
// AccountSid: string;
// MessagingServiceSid: string;
// From: string;
// To: string;
// Body: string;
// NumMedia: number;
