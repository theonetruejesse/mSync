import { client } from "..";
import { Event } from "../core/Event";

export default new Event("interactionCreate", async (interaction) => {
  if (interaction.isChatInputCommand()) {
    const { commandName } = interaction;

    // Check if the command exists
    if (!client.slashCommandsByName.hasOwnProperty(commandName)) {
      await interaction.reply(`Command '${commandName}' does not exist!`);
      return;
    }

    // If all is good, handle the command!
    await client.slashCommandsByName[commandName].handle(interaction);
  }
  return;
});
