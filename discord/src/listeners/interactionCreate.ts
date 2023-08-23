import { Events, Interaction } from "discord.js";
import { ListenerBuilder } from "../core/listener-builder";
import { bot } from "../index";

export default new ListenerBuilder()
  .setEvent(Events.InteractionCreate)
  .setHandler(async (interaction: Interaction) => {
    if (interaction.isChatInputCommand()) {
      const { commandName } = interaction;
      if (!bot.commands.hasOwnProperty(commandName)) {
        await interaction.reply("Invalid command");
        return;
      }
      await bot.commands[commandName].handle(interaction);
    }
  });
