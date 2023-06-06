import { CommandInteractionOptionResolver } from "discord.js";
import { ExtendedInteraction } from "../typings/command";
import { client } from "../src";
import { Event } from "../structures/Event";

export default new Event("interactionCreate", async (interaction) => {
  if (interaction.isCommand()) {
    await interaction.deferReply();
    const command = client.commands.get(interaction.commandName);
    if (!command) return interaction.followUp("invalid command name");
    command.run({
      args: interaction.options as CommandInteractionOptionResolver,
      client,
      interaction: interaction as ExtendedInteraction,
    });
  }
  return;
});
