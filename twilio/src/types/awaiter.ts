import { Message } from "../core/message";
import { Client } from "../core/client";

type AwaiterResolver = (message: Message) => void;

export class Awaiter {
  public client?: Client;
  public from?: string;
  public timeout: number = 60_000;
  private resolver?: AwaiterResolver;

  public await() {
    const { from, client, timeout } = this;
    if (!from || !client) return;
    if (client.awaiters.hasOwnProperty(from)) {
      throw `Cannot have multiple awaiters listening to same \`from\` '${from}'`;
    }
    setTimeout(() => {
      if (client.awaiters.hasOwnProperty(from) && client.awaiters[from] == this)
        delete client.awaiters[from];
    }, timeout);
    return new Promise((resolve) => {
      this.resolver = (message) => resolve(message);
    });
  }

  public resolve(message: Message) {
    const { from, client } = this;
    if (!from || !client) return;
    this.resolver?.(message);
    delete client.awaiters[from];
  }
}
