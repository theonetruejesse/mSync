import { IncomingMessage } from "../types/twilio";
import { Command, CommandOptionType } from "../types/command";
import { Client } from "./client";
import { Message } from "./message";

type InteractionOptionsGetType<T> = {
  <U extends boolean>(
    key: string,
    required?: U
  ): U extends true ? T : T | undefined;
  (key: string, required?: boolean): T | undefined;
};

export class InteractionOptions {
  private shortOptions: { [shortName: string]: any } = {};
  private longOptions: { [longName: string]: any } = {};
  private options: { [customId: string]: any } = {};
  private booleanOptions: { [customId: string]: boolean } = {};
  private numberOptions: { [customId: string]: number } = {};
  private stringOptions: { [customId: string]: string } = {};

  constructor(optionsString: string) {
    let pointer = 0;
    const end = () => {
      return pointer == optionsString.length;
    };
    const eat = () => {
      if (end()) throw "Unexpected end of input";
      return optionsString[pointer++];
    };
    const poll = () => {
      if (end()) throw "Unexpected end of input";
      return optionsString[pointer];
    };
    const eatCharacter = () => {
      let rv = eat();
      if (rv == "\\") rv = eat();
      return rv;
    };
    const eatString = () => {
      const initiator = eat();
      let rv = "";
      while (true) {
        if (poll() == initiator) break;
        rv += eatCharacter();
      }
      pointer++;
      return rv;
    };
    const eatToken = () => {
      let rv = "";
      while (true) {
        if (end() || poll() == " ") break;
        rv += eatCharacter();
      }
      return rv;
    };
    const eatOptions = () => {
      let key = "";
      let value: any;
      while (true) {
        if (end() || poll() == " ") {
          value = true;
          break;
        }
        if (poll() == "=") {
          eat();
          if (/['"]/.test(poll())) value = eatString();
          else value = eatToken();
          break;
        }
        key += eatCharacter();
      }
      if (/^-[\w\d]$/.test(key)) {
        this.shortOptions[key.slice(1)] = value;
        return;
      }
      if (/^-[\w\d]{2,}$/.test(key)) {
        if (value != true) throw "Dense options cannot have value";
        for (const shortOption of key.slice(1))
          this.shortOptions[shortOption] = true;
        return;
      }
      if (/^--[\w\d][-\w\d]*$/.test(key)) {
        this.longOptions[key.slice(2)] = value;
        return;
      }
      throw `Invalid \`key\` '${key}'`;
    };
    function eatWhitespace() {
      let rv = "";
      while (true) {
        if (end() || poll() != " ") break;
        rv += eat();
      }
      return rv;
    }
    eatWhitespace();
    while (!end()) {
      eatOptions();
      eatWhitespace();
    }
  }

  public setCommand(command: Command) {
    function isBoolean(value: any): value is boolean {
      return value == true || value == false || /[01]|true|false/.test(value);
    }
    function isNumber(value: any): value is number {
      return !isNaN(Number(value));
    }
    function isString(value: any): value is string {
      return typeof value == "string";
    }
    for (const customId in command.options) {
      const commandOption = command.options[customId];
      let interactionOption: any = undefined;
      if (!interactionOption && commandOption.longName) {
        interactionOption = this.longOptions[commandOption.longName];
      }
      if (!interactionOption && commandOption.shortName) {
        interactionOption = this.shortOptions[commandOption.shortName];
      }
      if (interactionOption) {
        if (commandOption.type == CommandOptionType.Boolean) {
          if (!isBoolean(interactionOption))
            throw `Option with \`customId\` '${customId}' is not boolean`;
          this.booleanOptions[customId] = interactionOption;
        }
        if (commandOption.type == CommandOptionType.Number) {
          if (!isNumber(interactionOption))
            throw `Option with \`customId\` '${customId}' is not number`;
          this.numberOptions[customId] = interactionOption;
        }
        if (commandOption.type == CommandOptionType.String) {
          if (!isString(interactionOption))
            throw `Option with \`customId\` '${customId}' is not string`;
          this.stringOptions[customId] = interactionOption;
        }
        this.options[customId] = interactionOption as any;
      } else if (commandOption.required) {
        throw `Required option with \`customId\` '${customId}' missing`;
      }
    }
    return this;
  }

  public getShortOption: InteractionOptionsGetType<any> = (
    shortName: string,
    required?: boolean
  ) => {
    const option = this.shortOptions[shortName];
    if (!option && required)
      throw `Required option with \`shortName\` '${shortName}' is missing`;
    return option;
  };

  public getLongOption: InteractionOptionsGetType<any> = (
    longName: string,
    required?: boolean
  ) => {
    const option = this.longOptions[longName];
    if (!option && required)
      throw `Required option with \`longName\` '${longName}' is missing`;
    return option;
  };

  public get: InteractionOptionsGetType<any> = (
    customId: string,
    required?: boolean
  ) => {
    const option = this.options[customId];
    if (!option && required)
      throw `Required option with \`customId\` '${customId}' is missing`;
    return option;
  };

  public getBoolean: InteractionOptionsGetType<boolean> = (
    customId: string,
    required?: boolean
  ) => {
    const option = this.booleanOptions[customId];
    if (!option && required)
      throw `Required boolean option with \`customId\` '${customId}' is missing`;
    return option;
  };

  public getNumber: InteractionOptionsGetType<number> = (
    customId: string,
    required?: boolean
  ) => {
    const option = this.numberOptions[customId];
    if (!option && required)
      throw `Required number option with \`customId\` '${customId}' is missing`;
    return option;
  };

  public getString: InteractionOptionsGetType<string> = (
    customId: string,
    required?: boolean
  ) => {
    const option = this.stringOptions[customId];
    if (!option && required)
      throw `Required string option with \`customId\` '${customId}' is missing`;
    return option;
  };
}

export class Interaction extends Message {
  public commandName: string;
  public options: InteractionOptions;
  public command?: Command;

  constructor(client: Client, incomingMessage: IncomingMessage) {
    super(client, incomingMessage);
    const parsed = /(?<=\/)([\w\d][-\w\d]*)\s*(.*)/.exec(incomingMessage.Body);
    if (parsed == null)
      throw `Could not parse \`incomingMessage.Body\` '${incomingMessage.Body}'`;
    this.commandName = parsed[1];
    this.options = new InteractionOptions(parsed[2]);
  }

  public setCommand(command: Command) {
    this.command = command;
    this.options.setCommand(command);
  }
}
