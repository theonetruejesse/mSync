import { Events } from "discord.js";
import { ListenerBuilder } from "../core/listener-builder";
import { Interaction } from "../core/interaction";

export default new ListenerBuilder()
  .setEvent(Events.InteractionCreate)
  .setHandler(async (interaction: Interaction) => {
    const { command } = interaction;
    if (!command) return;
    await command.handle(interaction);
  });
