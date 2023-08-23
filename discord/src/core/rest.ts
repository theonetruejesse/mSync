import { REST as DiscordRest, Routes } from "discord.js";
import { Command } from "../types/command";
import { log } from "../utils/log";

export class Rest {
  private commands: {
    [scope: string]: {
      [name: string]: Command;
    };
  } = {};
  private needsUpdate = new Set<string>();
  private rest: DiscordRest;

  constructor() {
    this.rest = new DiscordRest().setToken(process.env.TOKEN);
  }

  private put() {
    return Promise.all(
      [...this.needsUpdate.values()].map((scope) => {
        if (scope == "global") {
          return this.rest
            .put(Routes.applicationCommands(process.env.CLIENT_ID), {
              body: Object.values(this.commands[scope])
            })
            .then(() => log("PUT global"));
        } else {
          return this.rest
            .put(
              Routes.applicationGuildCommands(process.env.CLIENT_ID, scope),
              { body: Object.values(this.commands[scope]) }
            )
            .then(() => log(`PUT guild ${scope}`));
        }
      })
    );
  }

  public registerCommands(commands: Command[]) {
    for (const command of commands) {
      log(`Registering command \`/${command.name}\``);
      if (command.isLocal()) {
        for (const scope of command.guildIds) {
          (this.commands[scope] ??= {})[command.name] = command;
          this.needsUpdate.add(scope);
        }
      } else {
        (this.commands["global"] ??= {})[command.name] = command;
        this.needsUpdate.add("global");
      }
    }
    return this.put();
  }

  public deregisterCommands(commands: Command[]) {
    for (const command of commands) {
      log(`Deregistering command \`/${command.name}\``);
      if (command.isLocal()) {
        for (const scope of command.guildIds) {
          delete this.commands[scope][command.name];
          this.needsUpdate.add(scope);
        }
      } else {
        delete this.commands["global"][command.name];
        this.needsUpdate.add("global");
      }
    }
    return this.put();
  }
}
