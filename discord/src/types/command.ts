import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export type CommandHandler = (
  interaction: ChatInputCommandInteraction
) => Promise<void>;

export class Command extends SlashCommandBuilder {
  public handler?: CommandHandler;
  public guildIds: Set<string> = new Set<string>();

  public isLocal() {
    return this.guildIds.size > 0;
  }

  public handle(interaction: ChatInputCommandInteraction) {
    return this.handler?.(interaction);
  }
}
