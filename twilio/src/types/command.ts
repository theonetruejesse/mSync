import { Interaction } from "../core/interaction";

export enum CommandOptionType {
  Boolean = "boolean",
  None = "none",
  Number = "number",
  String = "string"
}

export class CommandOption {
  type: string = CommandOptionType.None;
  customId?: string;
  shortName?: string;
  longName?: string;
  description?: string;
  required: boolean = false;
}

export type CommandHandler = (interaction: Interaction) => Promise<void> | void;

export class Command {
  public name?: string;
  public description?: string;
  public options: { [customId: string]: CommandOption } = {};
  public handler?: CommandHandler;

  public handle(interaction: Interaction) {
    return this.handler?.(interaction);
  }
}
