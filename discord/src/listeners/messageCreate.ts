import { Events, Message } from "discord.js";
import { ListenerBuilder } from "../core/listener-builder";
import { trpc } from "../core/trpc";

export default new ListenerBuilder()
  .setEvent(Events.MessageCreate)
  .setHandler(async (message: Message) => {
    trpc.message.mutate({
      message: message.content,
      channelDiscordId: message.channelId,
      userDiscordId: message.author.id
    });
  });
