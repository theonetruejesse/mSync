import { Client } from "./client";
import fs from "fs";
import path from "path";
import { Command } from "../types/command";
import { Listener } from "../types/listener";
import { log } from "../utils/log";

export class Bot {
  private client: Client;
  readonly commands: { [name: string]: Command } = {};
  readonly listeners: { [event: string]: Listener } = {};

  constructor() {
    this.client = new Client();
  }

  public init() {
    return Promise.all([this.initCommands(), this.initListeners()]).then(() =>
      log("Initialized")
    );
  }

  private importDir(dirPath: string) {
    return Promise.all(
      fs
        .readdirSync(dirPath)
        .filter((filePath) => filePath.endsWith(".js"))
        .map((filePath) =>
          import(path.join(dirPath, filePath)).then((module) => module?.default)
        )
    ).then((modules) => modules.filter((module) => !!module));
  }

  private importCommands() {
    return this.importDir(path.join(__dirname, "../commands")).then((modules) =>
      modules.filter((module) => module instanceof Command)
    );
  }

  private importListeners() {
    return this.importDir(path.join(__dirname, "../listeners")).then(
      (modules) => modules.filter((module) => module instanceof Listener)
    );
  }

  private initCommands() {
    return this.importCommands().then((commands) => {
      for (const command of commands) {
        if (!command.name || !command.handler) continue;
        this.commands[command.name] = command;
      }
      return this.client.registerCommands(commands);
    });
  }

  private initListeners() {
    return this.importListeners().then((listeners) => {
      for (const listener of listeners) {
        if (!listener.name || !listener.handler) continue;
        this.listeners[listener.event] = listener;
      }
      return this.client.addListeners(listeners);
    });
  }
}
