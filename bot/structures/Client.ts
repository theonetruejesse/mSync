import {
  ApplicationCommandDataResolvable,
  Client,
  ClientEvents,
  Collection,
  IntentsBitField,
} from "discord.js";
import glob from "glob";
import { RegisterCommandsOptions } from "../typings/client";
import { CommandType } from "../typings/command";
import { Event } from "./Event";

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
    const commandFiles = await glob(`${__dirname}/../commands/*{.ts,.js}`);

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
    const eventFiles: any = await glob(`${__dirname}/../events/*{.ts,.js}`);
    eventFiles.forEach(async (filePath: string) => {
      const event: Event<keyof ClientEvents> = await this.importFile(filePath);
      this.on(event.event, event.run);
    });
  }
}
