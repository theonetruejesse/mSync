import { config } from "dotenv-safe";
config();

import { Forward } from "./core/forward";

new Forward();

import axios from "axios";

(async () => {
  axios.post(`http://localhost:${process.env.PORT}/message`, {
    MessageSid: "*".repeat(34),
    SmsSid: "*".repeat(34),
    AccountSid: "*".repeat(34),
    MessagingServiceSid: "*".repeat(34),
    From: "+16197308683",
    To: process.env.TWILIO_PHONE_NUMBER,
    Body: "/render",
    NumMedia: 0
  });

  await new Promise((resolve) => setTimeout(resolve, 1_000));

  axios.post(`http://localhost:${process.env.PORT}/message`, {
    MessageSid: "*".repeat(34),
    SmsSid: "*".repeat(34),
    AccountSid: "*".repeat(34),
    MessagingServiceSid: "*".repeat(34),
    From: "+16197308683",
    To: process.env.TWILIO_PHONE_NUMBER,
    Body: "1,2",
    NumMedia: 0
  });

  await new Promise((resolve) => setTimeout(resolve, 1_000));

  axios.post(`http://localhost:${process.env.PORT}/message`, {
    MessageSid: "*".repeat(34),
    SmsSid: "*".repeat(34),
    AccountSid: "*".repeat(34),
    MessagingServiceSid: "*".repeat(34),
    From: "+16197308683",
    To: process.env.TWILIO_PHONE_NUMBER,
    Body: "2",
    NumMedia: 0
  });
})();
// MessageSid: string;
// SmsSid: string;
// AccountSid: string;
// MessagingServiceSid: string;
// From: string;
// To: string;
// Body: string;
// NumMedia: number;
