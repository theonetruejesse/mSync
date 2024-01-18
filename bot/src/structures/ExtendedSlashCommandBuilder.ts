import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export type ExtendedSlashCommandHandler = (interaction: ChatInputCommandInteraction) => Promise<void>;

// Functions exactly the same as `SlashCommandBuilder`, just with a few
// extra methods to speed things up. Besides the getters, they are:
// - `setEventHandler()` set event handler
// - `addGuildId()` adds a guildId (automatically making the command local)
// - `handle()` handle the interaction calling this slash command
export class ExtendedSlashCommandBuilder extends SlashCommandBuilder {
  private handler: ExtendedSlashCommandHandler | null = null;
  private guildIds: Set<string> = new Set<string>();
  private local: boolean = false;

  constructor() {
    super();
  }

  setHandler(fn: ExtendedSlashCommandHandler) {
    this.handler = fn;
    return this;
  }

  addGuildId(id: string) {
    this.guildIds.add(id);
    this.local = true;
    return this;
  }

  getGuildIds(): ReadonlySet<string> {
    return this.guildIds;
  }

  isLocal() {
    return this.local;
  }

  handle(interaction: ChatInputCommandInteraction) {
    this.handler?.(interaction);
  }
};