import { Client } from "./client";
import { Rest } from "./rest";
import fs from "fs";
import path from "path";
import { Command } from "../types/command";
import { Listener } from "../types/listener";
import { log } from "../utils/log";

export class Bot {
  private client: Client;
  private rest: Rest;
  readonly commands: {
    [name: string]: Command;
  } = {};
  readonly listeners: {
    [event: string]: Listener;
  } = {};

  constructor() {
    this.client = new Client();
    this.rest = new Rest();
  }

  public init() {
    return Promise.all([
      this.initCommands(),
      this.initListeners(),
      this.client.login()
    ]).then(() => log("Initialized"));
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
        if (!command.name) throw "Command must have `name`";
        if (!command.handler) throw "Command must have `handler`";
        this.commands[command.name] = command;
      }
      return this.rest.registerCommands(commands);
    });
  }

  private initListeners() {
    return this.importListeners().then((listeners) => {
      for (const listener of listeners) {
        if (!listener.event) throw "Listener must have `event`";
        if (!listener.handler) throw "Listener must have `handler`";
        this.listeners[listener.event] = listener;
      }
      return this.client.addListeners(listeners);
    });
  }
}
