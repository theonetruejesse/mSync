import { Command, CommandHandler } from "../types/command";

export class CommandBuilder extends Command {
  constructor() {
    super();
  }

  public setHandler(handler: CommandHandler) {
    this.handler = handler;
    return this;
  }

  public addGuildId(id: string) {
    this.guildIds.add(id);
    return this;
  }
}
