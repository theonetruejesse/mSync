import {
  ApplicationCommandDataResolvable,
  Client,
  ClientEvents,
  Collection,
  IntentsBitField,
} from "discord.js";
import { RegisterCommandsOptions } from "../types/client";
import { CommandType } from "../types/command";
import { Event } from "./Event";
import * as path from "path";
import * as fs from "fs";

export class DiscordClient extends Client {
  commands: Collection<string, CommandType> = new Collection();

  constructor() {
    super({
      intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
      ],
    });
  }

  start() {
    this.registerModules();
    this.login(process.env.DISCORD_BOT_TOKEN);
  }

  async importFile(path: string) {
    return (await import(path))?.default;
  }

  async registerCommands({ commands, guildId }: RegisterCommandsOptions) {
    if (guildId) {
      this.guilds.cache.get(guildId)?.commands.set(commands);
      console.log();
      console.log(`Registering commands to ${guildId}`);
    } else {
      this.application?.commands.set(commands);
      console.log("Registering global commands");
    }
  }

  async registerModules() {
    // commands
    const slashCommands: ApplicationCommandDataResolvable[] = [];
    const commandPath = path.join(__dirname, "../commands/");
    const commandFiles = fs.readdirSync(commandPath)
      .filter(filePath => /\.[jt]s$/.test(filePath))
      .map(filePath => path.join(commandPath, filePath));

    console.log("Commands:");
    commandFiles.forEach(async (filePath: string) => {
      const command: CommandType = await this.importFile(filePath);
      if (!command.name) return;
      console.log(`/${command.name}`);
      this.commands.set(command.name, command);
      slashCommands.push(command);
    });
    this.on("ready", () => {
      this.registerCommands({
        commands: slashCommands,
        guildId: process.env.DISCORD_BOT_GUILD_ID,
      });
    });

    // events
    const eventPath = path.join(__dirname, "../events/");
    const eventFiles = fs.readdirSync(eventPath)
      .filter(filePath => /\.[jt]s$/.test(filePath))
      .map(filePath => path.join(eventPath, filePath));
    eventFiles.forEach(async (filePath: string) => {
      const event: Event<keyof ClientEvents> = await this.importFile(filePath);
      this.on(event.event, event.run);
    });
  }
}
