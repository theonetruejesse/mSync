import {
  CommandOptionType,
  CommandOption,
  Command,
  CommandHandler
} from "../types/command";

export class CommandOptionBuilder extends CommandOption {
  constructor() {
    super();
  }

  public setCustomId(customId: string) {
    this.customId = customId;
    return this;
  }

  public setLongName(longName: string) {
    if (!/^[\w\d][-\w\d]*$/.test(longName))
      throw `Invalid \`longName\` \'${longName}\'`;
    this.longName = longName;
    return this;
  }

  public setShortName(shortName: string) {
    if (!/^[\w\d]$/.test(shortName))
      throw `Invalid \`shortName\` \'${shortName}\'`;
    this.shortName = shortName;
    return this;
  }

  public setDescription(description: string) {
    this.description = description;
    return this;
  }

  public setRequired(required: boolean) {
    this.required = required;
    return this;
  }
}

export class CommandBooleanOptionBuilder extends CommandOptionBuilder {
  type = CommandOptionType.Boolean;
}

export class CommandNumberOptionBuilder extends CommandOptionBuilder {
  type = CommandOptionType.Number;
}

export class CommandStringOptionBuilder extends CommandOptionBuilder {
  type = CommandOptionType.String;
}

export class CommandBuilder extends Command {
  constructor() {
    super();
  }

  public setName(name: string) {
    if (!/^[\w\d][-\w\d]*$/.test(name)) throw `Invalid \`name\` \'${name}\'`;
    this.name = name;
    return this;
  }

  public setDescription(description: string) {
    this.description = description;
    return this;
  }

  public addBooleanOption(option: CommandOption) {
    if (!option.customId) throw "Option must have `customId`";
    this.options[option.customId] = option;
    return this;
  }

  public addNumberOption(option: CommandOption) {
    if (!option.customId) throw "Option must have `customId`";
    this.options[option.customId] = option;
    return this;
  }

  public addStringOption(option: CommandOption) {
    if (!option.customId) throw "Option must have `customId`";
    this.options[option.customId] = option;
    return this;
  }

  public setHandler(handler: CommandHandler) {
    this.handler = handler;
    return this;
  }
}
