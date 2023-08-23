import { Events, Message } from "discord.js";
import { ListenerBuilder } from "../core/listener-builder";

export default new ListenerBuilder()
  .setEvent(Events.MessageCreate)
  .setHandler(async (message: Message) => {});
