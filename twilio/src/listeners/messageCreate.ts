import { Events } from "discord.js";
import { ListenerBuilder } from "../core/listener-builder";
import { Message } from "../core/message";

export default new ListenerBuilder()
  .setEvent(Events.MessageCreate)
  .setHandler(async (message: Message) => {
    console.log(message);
  });
