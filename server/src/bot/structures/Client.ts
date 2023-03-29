import {
  ApplicationCommandDataResolvable,
  Client,
  ClientEvents,
  Collection,
  GatewayDispatchEvents,
} from "discord.js";
import glob, { GlobOptions } from "glob";
import { RegisterCommandsOptions } from "src/bot/typings/client";
import { CommandType } from "src/bot/typings/command";
import { Event } from "./Event";

export class DiscordClient extends Client {
  commands: Collection<string, CommandType> = new Collection();

  constructor() {
    super({ intents: parseInt(process.env.DISCORD_BOT_INTENT_EVERYTHING) });
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
      console.log(`Registering commands to ${guildId}`);
    } else {
      this.application?.commands.set(commands);
      console.log("Registering global commands");
    }
  }

  async registerModules() {
    // commands
    const slashCommands: ApplicationCommandDataResolvable[] = [];
    const commandFiles: any = await glob(
      `${__dirname}/../commands/*/*{.ts,.js}`
    );

    commandFiles.forEach(async (filePath: string) => {
      const command: CommandType = await this.importFile(filePath);
      if (!command.name) return;
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
