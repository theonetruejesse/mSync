import { Client } from "./client";
import { IncomingMessage } from "../types/twilio";
import { formatReply } from "../utils/format";
import { AwaiterBuilder } from "../core/awaiter-builder";

export class Message {
  client: Client;
  from: string;
  body: string;

  constructor(client: Client, incomingMessage: IncomingMessage) {
    this.client = client;
    this.from = incomingMessage.From;
    this.body = incomingMessage.Body;
  }

  public reply(message: string) {
    this.client.twilio.messages.create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to: this.from,
      body: formatReply("SYSTEM", message, this.body)
    });
  }

  public awaitReply() {
    return new AwaiterBuilder().setClient(this.client).setFrom(this.from);
  }
}
