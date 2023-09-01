import { Client as DiscordClient, GatewayIntentBits } from "discord.js";
import { Listener } from "../types/listener";
import { log } from "../utils/log";

export class Client {
  private client: DiscordClient;

  constructor() {
    this.client = new DiscordClient({
      intents: [GatewayIntentBits.Guilds]
    });
  }

  public addListeners(listeners: Listener[]) {
    for (const listener of listeners) {
      if (!listener.event) throw "Listener must have `event`";
      if (!listener.handler) throw "Listener must have `handler`";
      log(`Listening to event \`${listener.event}\``);
      if (listener.once) {
        this.client.once(listener.event, listener.handler);
      } else {
        this.client.on(listener.event, listener.handler);
      }
    }
  }

  public removeListeners(listeners: Listener[]) {
    for (const listener of listeners) {
      if (!listener.event) throw "Listener must have `event`";
      if (!listener.handler) throw "Listener must have `handler`";
      log(`Ignoring event \`${listener.event}\``);
      this.client.removeListener(listener.event, listener.handler);
    }
  }

  public login() {
    return this.client.login(process.env.TOKEN);
  }
}
