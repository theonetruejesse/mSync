import { Events } from "discord.js";
import { ListenerBuilder } from "../core/listener-builder";
import { bot } from "../index";
import { Interaction } from "../core/interaction";

export default new ListenerBuilder()
  .setEvent(Events.InteractionCreate)
  .setHandler(async (interaction: Interaction) => {
    const { commandName } = interaction;
    if (!bot.commands.hasOwnProperty(commandName)) {
      return;
    }
    await bot.commands[commandName].handle(interaction);
  });
