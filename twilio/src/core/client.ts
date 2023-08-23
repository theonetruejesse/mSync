import express, { Express } from "express";
import bodyParser from "body-parser";
import { Twilio } from "twilio";
import { IncomingMessage } from "../types/twilio";
import { isIncomingMessage } from "../utils/validation";
import EventEmitter from "events";
import { Listener } from "../types/listener";
import { Events } from "../types/event";
import { Interaction } from "./interaction";
import { Message } from "./message";
import { Command } from "../types/command";
import { Awaiter } from "../types/awaiter";
import { log } from "../utils/log";
import cors from "cors";

export class Client {
  private app: Express;
  private eventEmitter = new EventEmitter();
  public commands: { [name: string]: Command } = {};
  public awaiters: { [from: string]: Awaiter } = {};
  public twilio: Twilio;

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.post("/message", (req, res) => {
      const incomingMessage: IncomingMessage = req.body;
      if (isIncomingMessage(incomingMessage)) {
        this.handleIncomingMessage(incomingMessage);
        res.sendStatus(200);
      } else {
        res.sendStatus(422);
      }
    });
    this.app.listen(process.env.PORT, () => {
      this.eventEmitter.emit(Events.Ready);
    });
    this.twilio = new Twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
  }

  private handleIncomingMessage(incomingMessage: IncomingMessage) {
    if (this.awaiters.hasOwnProperty(incomingMessage.From)) {
      this.awaiters[incomingMessage.From].resolve(
        new Message(this, incomingMessage)
      );
      return;
    }
    if (incomingMessage.Body.startsWith("/")) {
      try {
        const interaction = new Interaction(this, incomingMessage);
        if (this.commands.hasOwnProperty(interaction.commandName)) {
          interaction.addCommand(this.commands[interaction.commandName]);
          this.eventEmitter.emit(Events.InteractionCreate, interaction);
          return;
        }
      } catch (e) {}
    }
    this.eventEmitter.emit(
      Events.MessageCreate,
      new Message(this, incomingMessage)
    );
  }

  public registerCommands(commands: Command[]) {
    for (const command of commands) {
      if (!command.name) continue;
      log(`Registering command \`/${command.name}\``);
      this.commands[command.name] = command;
    }
  }

  public deregisterCommands(commands: Command[]) {
    for (const command of commands) {
      if (!command.name) continue;
      log(`Deregistering command \`/${command.name}\``);
      delete this.commands[command.name];
    }
  }

  public addListeners(listeners: Listener[]) {
    for (const listener of listeners) {
      if (!listener.event || !listener.handler) continue;
      log(`Listening to event \`${listener.event}\``);
      if (listener.once) {
        this.eventEmitter.once(listener.event, listener.handler);
      } else {
        this.eventEmitter.on(listener.event, listener.handler);
      }
    }
  }

  public removeListeners(listeners: Listener[]) {
    for (const listener of listeners) {
      if (!listener.event || !listener.handler) continue;
      log(`Ignoring event \`${listener.event}\``);
      this.eventEmitter.removeListener(listener.event, listener.handler);
    }
  }
}
