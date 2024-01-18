import { ExtendedSlashCommandBuilder } from "../core/ExtendedSlashCommandBuilder";
import { trpc } from "../trpc";

export default new ExtendedSlashCommandBuilder()
  .setName("ping")
  .setDescription("Ping pong!")
  .setHandler(async interaction => {
    await interaction.reply(await trpc.discord.ping.query());
  });