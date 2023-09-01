import { Events } from "discord.js";
import { ListenerBuilder } from "../core/listener-builder";
import { Message } from "../core/message";
import { trpc } from "../core/trpc";

export default new ListenerBuilder()
  .setEvent(Events.MessageCreate)
  .setHandler(async (message: Message) => {
    trpc.message.mutate({
      contact: message.from,
      message: message.body
    });
  });
