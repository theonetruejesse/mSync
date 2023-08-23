import { ChatInputCommandInteraction } from "discord.js";
import { CommandBuilder } from "../core/command-builder";

export const t = new CommandBuilder()
  .setName("ping")
  .setDescription("Ping pong!")
  .setHandler(async (interaction: ChatInputCommandInteraction) => {
    await interaction.reply("Pong!");
  });
