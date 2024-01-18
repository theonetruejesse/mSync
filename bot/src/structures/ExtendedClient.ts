import { Client, IntentsBitField } from "discord.js";
import { ExtendedREST } from "./ExtendedREST";
import { ExtendedSlashCommandBuilder } from "./ExtendedSlashCommandBuilder";
import { EventEmitter } from "events";
import * as path from "path";
import * as fs from "fs";

export class ExtendedClient extends Client {
  slashCommandsByName: { [name: string]: ExtendedSlashCommandBuilder } = {};
  rest: ExtendedREST;

  constructor() {
    super({
      intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
      ],
    });
    this.rest = new ExtendedREST();
  }

  start() {
    return Promise.all([
      this.initialize(),
      this.login(process.env.DISCORD_BOT_TOKEN)
    ]);
  }

  async importModule(path: string) {
    const module = await import(path);
    if (!module) throw `Could not import module \`${path}\``;
    return module;
  }

  registerSlashCommands(slashCommands: ExtendedSlashCommandBuilder[]) {
    const { slashCommandsByName, rest } = this;

    for (const slashCommand of slashCommands) {
      slashCommandsByName[slashCommand.name] = slashCommand;
    }

    return rest.registerSlashCommands(slashCommands);
  }

  deregisterSlashCommands(slashCommands: ExtendedSlashCommandBuilder[]) {
    const { slashCommandsByName, rest } = this;

    for (const slashCommand of slashCommands) {
      delete slashCommandsByName[slashCommand.name];
    }

    return rest.deregisterSlashCommands(slashCommands);
  }

  initialize() {
    const slashCommandsListener = new EventEmitter();
    let slashCommands: ExtendedSlashCommandBuilder[] = [];

    this.on("ready", () => {
      // Register slash commands imported before the bot was ready
      this.registerSlashCommands(slashCommands);
      slashCommands = [];

      // Register if additional slash commands are pushed
      slashCommandsListener.on("push", () => {
        this.registerSlashCommands(slashCommands);
        slashCommands = [];
      });
    });
    
    // Register slash commands and add event handlers asynchronously
    return Promise.all([
      (async () => {
        // Get slash command paths
        const commandPath = path.join(__dirname, "../slash-commands/");
        const commandFiles = fs.readdirSync(commandPath)
          .filter(filePath => filePath.endsWith(".js"))
          .map(filePath => path.join(commandPath, filePath));
    
        // Import slash commands
        await Promise.all(commandFiles.map(async filePath => {
          const slashCommand = (await this.importModule(filePath)).default;
          if (!slashCommand || !slashCommand.name) return;
    
          console.log(`Importing slash command \`/${slashCommand.name}\`!`);
    
          // Push the imported slash command to an array to be processed
          // once the bot is ready
          slashCommands.push(slashCommand);

          // If the bot is already ready, emit a "push" event to let it
          // know a slash command has been pushed
          slashCommandsListener.emit("push");
        }));
      })(),
      (async () => {
        // Get event handler paths
        const eventPath = path.join(__dirname, "../event-handlers/");
        const eventFiles = fs.readdirSync(eventPath)
          .filter(filePath => filePath.endsWith(".js"))
          .map(filePath => path.join(eventPath, filePath));
    
        // Import event handlers
        await Promise.all(eventFiles.map(async filePath => {
          const eventHandler = (await this.importModule(filePath)).default;
          if (!eventHandler || !eventHandler.event) return;
    
          console.log(`Importing event handler \`${eventHandler.event}\`!`);
    
          // Listen to specified event
          this.on(eventHandler.event, eventHandler.run);
        }));
      })()
    ]);
  }
};