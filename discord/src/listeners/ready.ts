import { Client as DiscordClient, Events } from "discord.js";
import { ListenerBuilder } from "../core/listener-builder";
import { log } from "../utils/log";

export default new ListenerBuilder()
  .setEvent(Events.ClientReady)
  .setOnce(true)
  .setHandler((client: DiscordClient<true>) => {
    log(`Logged in as ${client.user.tag}`);
  });
